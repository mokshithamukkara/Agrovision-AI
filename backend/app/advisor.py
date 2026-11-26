
import time
import os
import json
import httpx


def _gemini_request(messages, temperature=0.2):
    key = os.getenv("LLM_API_KEY")
    base = os.getenv(
        "LLM_BASE_URL",
        "https://generativelanguage.googleapis.com/v1beta/openai/"
    ).rstrip("/")
    model = os.getenv("LLM_MODEL", "gemini-3.5-flash-lite")

    if not key or not model:
        return None

    for attempt in range(4):
        try:
            response = httpx.post(
                f"{base}/chat/completions",
                headers={
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": model,
                    "messages": messages,
                    "temperature": temperature
                },
                timeout=45
            )

            if response.status_code == 200:
                return response.json()["choices"][0]["message"]["content"]

            print("GEMINI STATUS:", response.status_code)
            print("GEMINI RESPONSE:", response.text)

            if response.status_code not in [429, 500, 502, 503, 504]:
                break

        except httpx.HTTPError as exc:
            print("GEMINI CONNECTION ERROR:", repr(exc))

        if attempt < 3:
            time.sleep(2 ** (attempt + 1))

    return None


def translate_text(text, language="English"):
    if not text or language == "English":
        return text

    result = _gemini_request([
        {
            "role": "system",
            "content": (
                "Translate the supplied agricultural text into "
                "the requested language. Preserve its meaning, "
                "numbers, crop names and scientific terms. "
                "Return only the translation."
            )
        },
        {
            "role": "user",
            "content": f"Language: {language}\nText: {text}"
        }
    ])

    return result.strip() if result else text


def _translate_payload(payload, language):
    if language == "English":
        return payload

    result = _gemini_request([
        {
            "role": "system",
            "content": (
                "Translate all user-facing string values in this JSON "
                "into the requested language. Keep every JSON key, "
                "number, data type and structure unchanged. "
                "Do not translate proper names unnecessarily. "
                "Return valid JSON only."
            )
        },
        {
            "role": "user",
            "content": (
                f"Language: {language}\n"
                f"JSON:\n{json.dumps(payload, ensure_ascii=False)}"
            )
        }
    ])

    if not result:
        return payload

    try:
        result = result.strip()
        if result.startswith("```"):
            result = result.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        translated = json.loads(result)

        if isinstance(translated, dict):
            return translated

    except (ValueError, TypeError) as exc:
        print("TRANSLATION PARSE ERROR:", repr(exc))

    return payload


def cultivation_advice(data):
    crop = data.get("crop", "your crop")
    loc = data.get("location", "not specified")
    language = data.get("language", "English")

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

    advice = {
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
        "caution": (
            "This is general guidance, not a location-verified prescription."
        )
    }

    return _translate_payload(advice, language)


def answer_question(data):
    language = data.get("language", "English")

    key = os.getenv("LLM_API_KEY")
    model = os.getenv("LLM_MODEL", "gemini-3.5-flash-lite")

    if not key:
        return "Gemini API key is missing. Check your backend .env file."

    if not model:
        return "Gemini model is missing. Check your backend .env file."

    system = (
        "You are AgroVision AI, a helpful agricultural assistant. "
        f"Always answer in {language}. "
        "Give safe, practical advice. "
        "Never invent pesticide doses or fertilizer rates. "
        "Ask for more information when necessary."
    )

    user = (
        f"Crop: {data.get('crop', 'Not specified')}\n"
        f"Location: {data.get('location', 'Not specified')}\n"
        f"Weather: {data.get('weather', {})}\n"
        f"Question: {data.get('question', '')}"
    )

    answer = _gemini_request([
        {"role": "system", "content": system},
        {"role": "user", "content": user}
    ])

    if answer:
        print("AGROVISION: Gemini response received")
        return answer

    return (
        "AgroVision AI is temporarily experiencing high demand. "
        "Please try your question again in a few minutes."
    )
