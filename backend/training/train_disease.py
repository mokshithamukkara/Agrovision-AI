
from pathlib import Path
import torch
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms

ROOT = Path(__file__).resolve().parent / "data"
OUT = Path(__file__).resolve().parents[1] / "models" / "disease_model.pth"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
BATCH_SIZE = 8
EPOCHS = 3

print("Device:", DEVICE, flush=True)

train_tf = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(12),
    transforms.ToTensor(),
    transforms.Normalize([.485, .456, .406], [.229, .224, .225])
])

val_tf = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([.485, .456, .406], [.229, .224, .225])
])

train_ds = datasets.ImageFolder(ROOT / "train", transform=train_tf)
val_ds = datasets.ImageFolder(ROOT / "val", transform=val_tf)

if train_ds.classes != val_ds.classes:
    raise ValueError("Training and validation categories do not match.")

print("Categories:", len(train_ds.classes), flush=True)
print("Training images:", len(train_ds), flush=True)
print("Validation images:", len(val_ds), flush=True)

train_dl = DataLoader(
    train_ds, batch_size=BATCH_SIZE, shuffle=True, num_workers=0
)

val_dl = DataLoader(
    val_ds, batch_size=BATCH_SIZE, num_workers=0
)

model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, len(train_ds.classes))
model.to(DEVICE)

optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
loss_fn = nn.CrossEntropyLoss()

best = -1.0

for epoch in range(EPOCHS):
    model.train()
    total = 0
    correct = 0
    running_loss = 0.0

    print(f"\nStarting epoch {epoch + 1}/{EPOCHS}", flush=True)

    for batch_no, (x, y) in enumerate(train_dl, start=1):
        x, y = x.to(DEVICE), y.to(DEVICE)

        optimizer.zero_grad()
        outputs = model(x)
        loss = loss_fn(outputs, y)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        total += y.size(0)
        correct += (outputs.argmax(1) == y).sum().item()

        if batch_no % 100 == 0:
            print(
                f"Epoch {epoch + 1}: batch {batch_no}/{len(train_dl)}",
                flush=True
            )

    train_acc = correct / max(total, 1)

    model.eval()
    vtotal = 0
    vcorrect = 0

    with torch.no_grad():
        for x, y in val_dl:
            x, y = x.to(DEVICE), y.to(DEVICE)
            outputs = model(x)
            vtotal += y.size(0)
            vcorrect += (outputs.argmax(1) == y).sum().item()

    val_acc = vcorrect / max(vtotal, 1)

    print(
        f"Epoch {epoch + 1}: "
        f"loss={running_loss / len(train_dl):.4f}, "
        f"train_acc={train_acc:.3f}, "
        f"val_acc={val_acc:.3f}",
        flush=True
    )

    if val_acc > best:
        best = val_acc
        OUT.parent.mkdir(parents=True, exist_ok=True)

        torch.save({
            "state_dict": model.cpu().state_dict(),
            "classes": train_ds.classes
        }, OUT)

        model.to(DEVICE)
        print("Best model saved:", OUT, flush=True)

print("\nTraining complete!", flush=True)
print("Best validation accuracy:", best, flush=True)
print("Model location:", OUT, flush=True)