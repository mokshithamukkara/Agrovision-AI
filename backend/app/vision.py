
from pathlib import Path
import os
import gc

import numpy as np
import torch
from PIL import Image

from .advisor import _translate_payload

BASE = Path(__file__).resolve().parents[1]

DISEASE_PATH = BASE / os.getenv(
    "DISEASE_MODEL_PATH", "models/disease_model.pth"
)

PEST_PATH = BASE / os.getenv(
    "PEST_MODEL_PATH", "models/pest_best.pt"
)

# Use CPU to avoid GPU memory requirements.
DEVICE = torch.device("cpu")

# Limit CPU threads to reduce resource usage.
torch.set_num_threads(1)

_disease_model = None
_disease_classes = None
_pest_model = None


def load_disease_model():
    global _disease_model, _disease_classes

    if _disease_model is not None:
        return

    if not DISEASE_PATH.exists():
        raise FileNotFoundError("Disease model file not found.")

    from torchvision import models
    from torch import nn

    checkpoint = torch.load(
        DISEASE_PATH,
        map_location=DEVICE,
        weights_only=False
    )

    _disease_classes = checkpoint["classes"]

    model = models.resnet18(weights=None)
    model.fc = nn.Linear(512, len(_disease_classes))

    model.load_state_dict(checkpoint["state_dict"])
    model.to(DEVICE)
    model.eval()

    _disease_model = model


def classify_disease(image):
    try:
        load_disease_model()

        image = image.convert("RGB").resize((224, 224))

        array = np.asarray(image, dtype=np.float32) / 255.0

        tensor = torch.from_numpy(
            array.transpose(2, 0, 1).copy()
        )

        mean = torch.tensor(
            [0.485, 0.456, 0.406]
        ).view(3, 1, 1)

        std = torch.tensor(
            [0.229, 0.224, 0.225]
        ).view(3, 1, 1)

        tensor = ((tensor - mean) / std).unsqueeze(0)

        with torch.inference_mode():
            output = _disease_model(tensor)
            probabilities = torch.softmax(output, dim=1)
            confidence, index = torch.max(probabilities, dim=1)

        score = float(confidence.item())
        prediction = _disease_classes[int(index.item())]

        if score < 0.60:
            return {
                "status": "uncertain",
                "prediction": None,
                "confidence": round(score, 4)
            }

        return {
            "status": "prediction",
            "prediction": prediction,
            "confidence": round(score, 4)
        }

    except Exception as exc:
        return {
            "status": "error",
            "prediction": None,
            "confidence": None,
            "message": str(exc)
        }


def detect_pests(image):
    global _pest_model

    if not PEST_PATH.exists():
        return {
            "status": "model_not_configured",
            "detections": [],
            "message": "Pest model file not found."
        }

    try:
        if _pest_model is None:
            from ultralytics import YOLO
            _pest_model = YOLO(str(PEST_PATH))

        image = image.convert("RGB").resize((640, 640))

        with torch.inference_mode():
            result = _pest_model(
                np.asarray(image),
                imgsz=416,
                device="cpu",
                verbose=False
            )[0]

        detections = []

        for box in result.boxes:
            detections.append({
                "label": result.names[int(box.cls.item())],
                "confidence": round(float(box.conf.item()), 4),
                "box_xyxy": [
                    round(float(x), 1)
                    for x in box.xyxy[0].tolist()
                ]
            })

        return {
            "status": "prediction",
            "detections": detections
        }

    except Exception as exc:
        return {
            "status": "error",
            "detections": [],
            "message": str(exc)
        }


def analyze_image(image, language="English"):

    disease = classify_disease(image)
    pests = detect_pests(image)

    crop_identification = {
        "status": "temporarily_disabled",
        "crop": None,
        "message": "Crop identification is temporarily disabled."
    }

    result = {
        "image_size": {
            "width": image.width,
            "height": image.height
        },
        "crop_identification": crop_identification,
        "disease": disease,
        "pests": pests,
        "safety_note": (
            "AI results are screening support, not a confirmed diagnosis. "
            "Do not apply pesticides based only on this result."
        )
    }

    if language != "English":
        original_statuses = {
            "crop_status": result["crop_identification"]["status"],
            "disease_status": result["disease"]["status"],
            "pest_status": result["pests"]["status"]
        }

        translated = _translate_payload(result, language)

        translated["crop_identification"]["status"] = (
            original_statuses["crop_status"]
        )
        translated["disease"]["status"] = (
            original_statuses["disease_status"]
        )
        translated["pests"]["status"] = (
            original_statuses["pest_status"]
        )

        result = translated

    return result
