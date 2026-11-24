from pathlib import Path
import os
import numpy as np
import torch
from torchvision import models, transforms
from PIL import Image

BASE = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE / os.getenv("DISEASE_MODEL_PATH", "models/disease_model.pth")
PEST_PATH = BASE / os.getenv("PEST_MODEL_PATH", "models/pest_best.pt")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
PREPROCESS = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def classify_disease(image):
    if not MODEL_PATH.exists():
        return {"status": "model_not_configured",
                "message": "Disease classifier is not trained yet. Follow backend/training/README.md.",
                "prediction": None, "confidence": None}
    checkpoint = torch.load(MODEL_PATH, map_location=DEVICE, weights_only=False)
    classes = checkpoint["classes"]
    model = models.resnet18(weights=None)
    model.fc = torch.nn.Linear(model.fc.in_features, len(classes))
    model.load_state_dict(checkpoint["state_dict"])
    model.to(DEVICE).eval()
    with torch.no_grad():
        probs = torch.softmax(model(PREPROCESS(image).unsqueeze(0).to(DEVICE)), dim=1)[0]
    score, idx = torch.max(probs, dim=0)
    confidence = float(score.item())
    if confidence < 0.60:
        return {"status": "uncertain", "prediction": None,
                "confidence": round(confidence, 4),
                "message": "The model is not confident enough. Please upload a clearer image or seek expert confirmation."}
    return {"status": "prediction", "prediction": classes[int(idx)],
            "confidence": round(confidence, 4)}

def detect_pests(image):
    if not PEST_PATH.exists():
        return {"status": "model_not_configured", "detections": [],
                "message": "Pest detector weights are not installed. Train a YOLO model and add pest_best.pt."}
    try:
        from ultralytics import YOLO
        model = YOLO(str(PEST_PATH))
        result = model(np.array(image), verbose=False)[0]
        detections = []
        for box in result.boxes:
            detections.append({
                "label": result.names[int(box.cls.item())],
                "confidence": round(float(box.conf.item()), 4),
                "box_xyxy": [round(float(x), 1) for x in box.xyxy[0].tolist()]
            })
        return {"status": "prediction", "detections": detections}
    except Exception as exc:
        return {"status": "error", "detections": [], "message": str(exc)}


def analyze_image(image):
    disease = classify_disease(image)
    pests = detect_pests(image)

    # Identify the crop from the disease model's predicted class
    crop_identification = {
        "status": "not_configured",
        "crop": None,
        "message": "Crop could not be identified."
    }

    if disease.get("status") == "prediction" and disease.get("prediction"):
        predicted_class = disease["prediction"]

        # PlantVillage class format: Crop___Disease
        crop_name = predicted_class.split("___")[0]

        # Make crop names easier to read
        crop_name = crop_name.replace("_(", " (").replace("_", " ")
        crop_name = crop_name.replace("including", "").replace(")", "").strip()

        crop_identification = {
            "status": "prediction",
            "crop": crop_name,
            "message": "Crop identified using the disease classification model."
        }

    return {
        "image_size": {
            "width": image.width,
            "height": image.height
        },
        "crop_identification": crop_identification,
        "disease": disease,
        "pests": pests,
        "safety_note": "AI results are screening support, not a confirmed diagnosis. Do not apply pesticides based only on this result."
    }
