# Disease model training

1. Download a permitted crop disease dataset (for example PlantVillage) and inspect its license/terms.
2. Arrange a subset into:
   data/train/Tomato_Early_blight/*.jpg
   data/train/Tomato_healthy/*.jpg
   data/val/Tomato_Early_blight/*.jpg
   data/val/Tomato_healthy/*.jpg
3. Use multiple images per class and keep a separate validation set. Do not put near-duplicate photos in both splits.
4. From backend/, run: `python training/train_disease.py`
5. The output is `backend/models/disease_model.pth`.

This baseline is for learning and evaluation. PlantVillage-style studio images may not generalize to field photos. Evaluate with independent images from the target region and crop varieties before any real use. Add crop identification as a separate model head/dataset. The provided API deliberately reports "not configured" until a valid model exists.

## Pest detection
Prepare a YOLO-format object-detection dataset with images and bounding-box labels, train using Ultralytics YOLO, and copy the best weights to `backend/models/pest_best.pt`. Include locally relevant pest species and test on field images. Follow the dataset license and pesticide safety guidance.
