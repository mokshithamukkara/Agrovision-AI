from pathlib import Path
import os
import numpy as np
from PIL import Image

from .advisor import _translate_payload

BASE = Path(__file__).resolve().parents[1]

PEST_PATH = BASE / os.getenv(
    "PEST_MODEL_PATH",
    "models/pest_best.pt"
)

# Disease detection temporarily disabled.
# Load the pest model only once and reuse it.
_pest_model = None


def classify_disease(image):
    return {
        "status": "temporarily_disabled",
        "message": "Disease detection is temporarily disabled.",
        "prediction": None,
        "confidence": None
    }


def detect_pests(image):
    global _pest_model

    if not PEST_PATH.exists():
        return {
            "status": "model_not_configured",
            "detections": [],
            "message": "Pest detector weights are not installed."
        }

    try:
        if _pest_model is None:
            from ultralytics import YOLO
            _pest_model = YOLO(str(PEST_PATH))

        result = _pest_model(
            np.array(image),
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
