
from pathlib import Path
import random
import shutil

# Original downloaded dataset
SOURCE = Path.home() / "Downloads" / "data" / "raw" / "color"

# Destination inside AgroVision AI
DEST = Path(__file__).resolve().parent / "data"

random.seed(42)

if not SOURCE.exists():
    raise FileNotFoundError(f"Dataset not found: {SOURCE}")

extensions = {".jpg", ".jpeg", ".png", ".bmp"}

classes = [p for p in SOURCE.iterdir() if p.is_dir()]

print("Disease categories found:", len(classes))

for class_folder in classes:
    images = [
        p for p in class_folder.iterdir()
        if p.is_file() and p.suffix.lower() in extensions
    ]

    if len(images) < 2:
        print("Skipping:", class_folder.name)
        continue

    random.shuffle(images)

    split = max(1, int(len(images) * 0.8))

    train_images = images[:split]
    val_images = images[split:]

    if not val_images:
        val_images = [train_images.pop()]

    for split_name, selected in [
        ("train", train_images),
        ("val", val_images)
    ]:
        target = DEST / split_name / class_folder.name
        target.mkdir(parents=True, exist_ok=True)

        for image in selected:
            shutil.copy2(image, target / image.name)

    print(
        class_folder.name,
        "Train:", len(train_images),
        "Validation:", len(val_images)
    )

print("\nDataset preparation complete!")
print("Dataset location:", DEST)
