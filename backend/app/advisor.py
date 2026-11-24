
import time
import os
import httpx


def cultivation_advice(data):
    crop = data.get("crop", "your crop")
    loc = data.get("location", "not specified")

    soil = data.get("soil_type") or "not specified"
    stage = data.get("growth_stage") or "not specified"

    temp = data.get("temperature_c")
    humidity = data.get("humidity")
    rain = data.get("rainfall_mm")

    observations = []

    if temp is not None:
        observations.append(f"Temperature: {temp} °C")

    if humidity is not None:
        observations.append(f"Relative humidity: {humidity}%")

    if rain is not None:
        observations.append(f"Rainfall: {rain} mm")

    return {
        "title": f"Initial cultivation checklist for {crop}",
        "context": {
            "location": loc,
            "soil_type": soil,
            "growth_stage": stage
        },
        "environment": observations,
        "recommendations": [
            "Confirm the locally recommended variety and sowing window.",
            "Use a recent soil-test report before deciding fertilizer quantities.",
            "Check soil moisture and forecast rainfall before irrigation.",
            "Scout the field regularly and record symptoms.",
            "Identify pests before choosing any treatment.",
            "Consult a qualified agricultural officer if symptoms spread quickly."
        ],
        "caution": "This is general guidance, not a location-verified prescription."
    }


def answer_question(data):
    key = os.getenv("LLM_API_KEY")

    base = os.getenv(
        "LLM_BASE_URL",
        "https://generativelanguage.googleapis.com/v1beta/openai/"
    ).rstrip("/")

    model = os.getenv("LLM_MODEL", "gemini-3.5-flash-lite")

    if not key:
        return "Gemini API key is missing. Check your backend .env file."

    if not model:
        return "Gemini model is missing. Check your backend .env file."

    system = (
        "You are AgroVision AI, a helpful agricultural assistant. "
        "Answer in the requested language. Give safe, practical advice. "
        "Never invent pesticide doses or fertilizer rates. "
        "Ask for more information when necessary."
    )

    user = (
        f"Language: {data.get('language', 'English')}\n"
        f"Crop: {data.get('crop', 'Not specified')}\n"
        f"Location: {data.get('location', 'Not specified')}\n"
        f"Weather: {data.get('weather', {})}\n"
        f"Question: {data.get('question', '')}"
    )

    for attempt in range(4):
        try:
            print("AGROVISION: Gemini attempt", attempt + 1)
            print("MODEL:", model)

            response = httpx.post(
                f"{base}/chat/completions",
                headers={
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": model,
                    "messages": [
                        {
                            "role": "system",
                            "content": system
                        },
                        {
                            "role": "user",
                            "content": user
                        }
                    ],
                    "temperature": 0.2
                },
                timeout=45
            )

            if response.status_code == 200:
                result = response.json()
                answer = result["choices"][0]["message"]["content"]

                print("AGROVISION: Gemini response received")
                return answer

            print("GEMINI STATUS:", response.status_code)
            print("GEMINI RESPONSE:", response.text)

            if response.status_code not in [429, 500, 502, 503, 504]:
                return (
                    f"Gemini API error ({response.status_code}): "
                    f"{response.text}"
                )

        except httpx.HTTPError as e:
            print("GEMINI CONNECTION ERROR:", repr(e))

        if attempt < 3:
            wait_time = 2 ** (attempt + 1)
            print("Retrying in", wait_time, "seconds...")
            time.sleep(wait_time)

    return (
        "AgroVision AI is temporarily experiencing high demand. "
        "Please try your question again in a few minutes."
    )
