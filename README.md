# AgroVision AI — starter project

A responsive React frontend and FastAPI backend for a smart agriculture assistant.

## What works in this starter
- Responsive web dashboard (also mobile-friendly).
- Upload JPG/PNG/WEBP crop images to the Python API.
- Disease classifier integration point (ResNet18 checkpoint).
- Pest detection integration point (YOLO weights).
- Live weather and 5-day forecast from Open-Meteo, using browser location permission.
- Cultivation checklist endpoint using farmer-provided crop, soil and stage.
- Chat assistant endpoint with optional OpenAI-compatible LLM configuration.
- Language selector for major Indian languages.

## Honest model status
The repository does NOT include trained crop/disease/pest weights. Until you train and add them, the API explicitly returns `model_not_configured`; it never invents a diagnosis. The multilingual selector is present, but actual translated LLM answers require a configured model that supports the selected language.

## Requirements
- Python 3.10 or 3.11 recommended.
- Node.js 20+ and npm.
- Git (optional).

## 1. Run backend (Windows PowerShell)
```powershell
cd AgroVision-AI/backend
py -3.11 -m venv .venv
.venv\\Scripts\\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
If PowerShell blocks activation, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in that terminal and activate again.

## 2. Run frontend (new terminal)
```powershell
cd AgroVision-AI/frontend
npm install
npm run dev
```
Open the Vite URL, normally http://localhost:5173. Keep the backend running at http://localhost:8000. API docs: http://localhost:8000/docs.

## 3. Optional AI chatbot
Edit `backend/.env` and set:
```env
LLM_API_KEY=your_api_key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=your-supported-model-name
```
Restart the backend. Keep API keys only on the backend; never put them in React/Vite variables or commit `.env`.

## 4. Train disease model
Read `backend/training/README.md`. Arrange data in ImageFolder format and run:
```powershell
cd backend
python training/train_disease.py
```
Place the output in `backend/models/disease_model.pth` (the script saves there automatically).

## 5. Pest detector
Train a YOLO object detector on a properly annotated, licensed pest dataset. Copy best weights to `backend/models/pest_best.pt`. See Ultralytics documentation for dataset YAML and training. Test with field images from your intended region.

## 6. Next production steps
1. Add a separate crop classifier or multi-task model and wire its checkpoint into `vision.py`.
2. Evaluate on independent field images, not only dataset test images; report per-class precision/recall and confusion matrix.
3. Add farmer accounts, consent, secure image storage and PostgreSQL.
4. Add local agricultural knowledge sources (ICAR, state agriculture universities, KVK advisories) with retrieval and citations.
5. Add rate limiting, file scanning, HTTPS, logging, monitoring and privacy policy before public launch.
6. Use local extension officers/plant pathologists to validate recommendations and pesticide safety.

## Safety
This is an educational prototype. AI predictions can be wrong. Do not use it as the sole basis for pesticide application, fertilizer rates or irrigation decisions. Follow label directions and current state/central regulations; consult a qualified local agricultural expert.
