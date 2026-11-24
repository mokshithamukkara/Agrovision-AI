from pathlib import Path
from typing import Optional
import os, io, datetime
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from PIL import Image
load_dotenv(Path(__file__).resolve().parent.parent / ".env", override=True)

from .vision import analyze_image
from .advisor import answer_question, cultivation_advice

app = FastAPI(title="AgroVision AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class ChatRequest(BaseModel):
    question: str = Field(min_length=2, max_length=2000)
    language: str = "English"
    crop: Optional[str] = None
    location: Optional[str] = None
    weather: Optional[dict] = None

class AdviceRequest(BaseModel):
    crop: str
    location: str
    language: str = "English"
    soil_type: Optional[str] = None
    growth_stage: Optional[str] = None
    temperature_c: Optional[float] = None
    humidity: Optional[float] = None
    rainfall_mm: Optional[float] = None

@app.get("/")
def root():
    return {"name": "AgroVision AI", "status": "running", "docs": "/docs"}

@app.get("/api/health")
def health():
    return {"status": "ok", "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()}

@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    if file.content_type not in {"image/jpeg", "image/png", "image/webp"}:
        raise HTTPException(400, "Upload a JPG, PNG or WEBP image.")
    raw = await file.read()
    if len(raw) > 10 * 1024 * 1024:
        raise HTTPException(413, "Image must be smaller than 10 MB.")
    try:
        image = Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception:
        raise HTTPException(400, "The uploaded file is not a valid image.")
    return analyze_image(image)

@app.get("/api/weather")
async def weather(latitude: float, longitude: float):
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        raise HTTPException(400, "Invalid coordinates.")
    params = {
        "latitude": latitude, "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m",
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
        "forecast_days": 5, "timezone": "auto"
    }
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            r = await client.get("https://api.open-meteo.com/v1/forecast", params=params)
            r.raise_for_status()
            return r.json()
    except httpx.HTTPError:
        raise HTTPException(502, "Weather service is temporarily unavailable.")


@app.post("/api/advice")
def advice(req: AdviceRequest):
    return cultivation_advice(req.model_dump())


@app.post("/api/chat")
def chat(req: ChatRequest):
    print("AGROVISION CHAT ROUTE REACHED!")
    return {
        "answer": answer_question(req.model_dump()),
        "language": req.language
    }


@app.get("/api/languages")
def languages():
    return {"languages": [
        "English", "हिन्दी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ",
        "മലയാളം", "मराठी", "ગુજરાતી", "বাংলা", "ਪੰਜਾਬੀ", "ଓଡ଼ିଆ"
    ]}


@app.get("/api/debug-config")
def debug_config():
    return {
        "api_key_loaded": bool(os.getenv("LLM_API_KEY")),
        "model": os.getenv("LLM_MODEL"),
        "base_url": os.getenv("LLM_BASE_URL")
    }
