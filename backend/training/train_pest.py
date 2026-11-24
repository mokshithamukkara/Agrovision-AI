
from pathlib import Path
import shutil
import yaml
from ultralytics import YOLO

# Project folders
BASE = Path(__file__).resolve().parent
DATASET = BASE / "pest_dataset"
MODELS = BASE.parent / "models"
DATA_YAML = DATASET / "data.yaml"

# Check dataset
if not DATA_YAML.exists():
    raise FileNotFoundError(f"Cannot find dataset configuration: {DATA_YAML}")

for folder in ["train/images", "train/labels",
               "valid/images", "valid/labels",
               "test/images", "test/labels"]:
    if not (DATASET / folder).exists():
        raise FileNotFoundError(f"Missing dataset folder: {folder}")

# Correct dataset paths automatically
with open(DATA_YAML, "r", encoding="utf-8") as f:
    data = yaml.safe_load(f)

data["path"] = str(DATASET.resolve()).replace("\\", "/")
data["train"] = "train/images"
data["val"] = "valid/images"
data["test"] = "test/images"

LOCAL_YAML = DATASET / "data_local.yaml"

with open(LOCAL_YAML, "w", encoding="utf-8") as f:
    yaml.safe_dump(data, f, sort_keys=False)

# Training configuration

# Training configuration
MODELS.mkdir(parents=True, exist_ok=True)

print("Resuming YOLOv8 pest detection training...", flush=True)

CHECKPOINT = MODELS / "pest_training" / "weights" / "last.pt"

if not CHECKPOINT.exists():
    raise FileNotFoundError(f"Checkpoint not found: {CHECKPOINT}")

model = YOLO(str(CHECKPOINT))

print("Starting training resume...", flush=True)
print("Device: CPU", flush=True)

model.train(
    resume=True,
)

# Copy the best trained weights
BEST = MODELS / "pest_training" / "weights" / "best.pt"
FINAL = MODELS / "pest_best.pt"

if not BEST.exists():
    raise FileNotFoundError(f"Best model not found: {BEST}")

shutil.copy2(BEST, FINAL)

print("\nPEST TRAINING COMPLETED!", flush=True)
print("Best model saved at:", FINAL, flush=True)
