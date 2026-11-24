
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Sprout,
  Upload,
  MapPin,
  CloudSun,
  ScanSearch,
  MessageCircle,
  Leaf,
  Languages,
  AlertTriangle,
  LoaderCircle
} from 'lucide-react';
import './style.css';

const API = 'http://127.0.0.1:8001';

const langs = [
  'English',
  'हिन्दी',
  'తెలుగు',
  'தமிழ்',
  'ಕನ್ನಡ',
  'മലയാളം',
  'मराठी',
  'ગુજરાતી',
  'বাংলা',
  'ਪੰਜਾਬੀ',
  'ଓଡ଼ିଆ'
];

function App() {
  const [lang, setLang] = useState('English');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [busy, setBusy] = useState(false);

  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState('');
  const [crop, setCrop] = useState('Tomato');

  const [question, setQuestion] = useState(
    'How can I keep my crop healthy?'
  );
  const [chat, setChat] = useState('');
  const [chatBusy, setChatBusy] = useState(false);

  const [soil, setSoil] = useState('Not sure');
  const [stage, setStage] = useState('Vegetative');

  const current = weather?.current;

  // IMAGE UPLOAD

  function choose(f) {
    if (!f) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      alert('Please select a JPG, PNG or WEBP image.');
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10 MB.');
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setAnalysis(null);
  }

  // CROP IMAGE ANALYSIS

  async function scan() {
    if (!file) {
      alert('Please select an image first.');
      return;
    }

    setBusy(true);
    setAnalysis(null);

    try {
      const fd = new FormData();
      fd.append('file', file);

      const r = await fetch(`${API}/api/analyze`, {
        method: 'POST',
        body: fd
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(d.detail || 'Image analysis failed.');
      }

      setAnalysis(d);
    } catch (e) {
      alert('Analysis error: ' + e.message);
    } finally {
      setBusy(false);
    }
  }

  // WEATHER AND LOCATION

  async function locate() {
    if (!navigator.geolocation) {
      alert('Location is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (p) => {
        const latitude = p.coords.latitude;
        const longitude = p.coords.longitude;

        setPlace(
          `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
        );

        try {
          const r = await fetch(
            `${API}/api/weather?latitude=${latitude}&longitude=${longitude}`
          );

          const d = await r.json();

          if (!r.ok) {
            throw new Error(d.detail || 'Weather request failed.');
          }

          setWeather(d);
        } catch (e) {
          alert('Could not load weather: ' + e.message);
        }
      },
      () => alert('Please allow location access.'),
      {
        enableHighAccuracy: true,
        timeout: 12000
      }
    );
  }

  // AI CHATBOT

  async function ask(e) {
    e.preventDefault();

    if (!question.trim()) return;

    setChatBusy(true);

    try {
      const r = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          language: lang,
          crop,
          location: place,
          weather: current || {}
        })
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(
          typeof d.detail === 'string'
            ? d.detail
            : JSON.stringify(d.detail || d)
        );
      }

      setChat(
        typeof d === 'string'
          ? d
          : d.answer || d.response || JSON.stringify(d)
      );
    } catch (e) {
      setChat('Error: ' + e.message);
    } finally {
      setChatBusy(false);
    }
  }

  // CULTIVATION ADVICE

  async function getAdvice() {
    try {
      const r = await fetch(`${API}/api/advice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          crop,
          location: place || 'Not provided',
          language: lang,
          soil_type: soil,
          growth_stage: stage,
          temperature_c: current?.temperature_2m,
          humidity: current?.relative_humidity_2m,
          rainfall_mm: current?.precipitation
        })
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(d.detail || 'Could not get cultivation advice.');
      }

      alert(
        Array.isArray(d.recommendations)
          ? d.recommendations.join('\n\n')
          : d.message || JSON.stringify(d)
      );
    } catch (e) {
      alert('Cultivation advice error: ' + e.message);
    }
  }

  return (
    <div className="app">

      {/* HEADER */}

      <header>
        <div className="brand">
          <span className="logo">
            <Sprout />
          </span>
          <span>
            AgroVision <b>AI</b>
            <small>SMART FARMING ASSISTANT</small>
          </span>
        </div>

        <nav>
          <a href="#scanner">Crop Scanner</a>
          <a href="#weather">Weather</a>
          <a href="#assistant">AI Assistant</a>
        </nav>

        <select
          aria-label="Language"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {langs.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </header>

      <main>

        {/* HERO SECTION */}

        <section className="hero">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              INTELLIGENCE FOR EVERY FIELD
            </div>

            <h1>
              Grow smarter.
              <br />
              <em>Farm better.</em>
            </h1>

            <p>
              AI-powered crop insights, local weather intelligence
              and practical farming guidance — in your language.
            </p>

            <div className="hero-actions">
              <a className="primary" href="#scanner">
                Analyze my crop <ScanSearch size={17} />
              </a>

              <a className="secondary" href="#weather">
                Explore dashboard
              </a>
            </div>

            <div className="trust">
              <span>
                <Leaf size={15} /> Crop health insights
              </span>
              <span>
                <CloudSun size={15} /> Weather-aware advice
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="sun" />
            <div className="field f1" />
            <div className="field f2" />
            <div className="field f3" />

            <div className="art-card">
              <Sprout />
              <span>
                <b>Healthier fields start here</b>
                <small>
                  Understand your crop, one photo at a time.
                </small>
              </span>
            </div>
          </div>
        </section>

        {/* PROCESS */}

        <section className="stats">
          <div>
            <b>01</b>
            <span>Upload a crop image</span>
          </div>
          <div>
            <b>02</b>
            <span>Analyze crop health</span>
          </div>
          <div>
            <b>03</b>
            <span>Get local guidance</span>
          </div>
          <div>
            <b>04</b>
            <span>Ask the AI assistant</span>
          </div>
        </section>

        {/* CROP SCANNER */}

        <section className="section" id="scanner">
          <div className="section-head">
            <div>
              <div className="eyebrow">AI IMAGE ANALYSIS</div>
              <h2>Your crop, under the lens.</h2>
              <p>
                Upload a clear photo of a leaf, plant or visible pest.
              </p>
            </div>
            <span className="tag">Image lab</span>
          </div>

          <div className="scanner-grid">

            {/* UPLOAD PANEL */}

            <div className="upload-panel">
              <label className="dropzone">
                {preview ? (
                  <img src={preview} alt="Selected crop" />
                ) : (
                  <>
                    <span className="upload-icon">
                      <Upload />
                    </span>
                    <b>Drop your crop image here</b>
                    <small>
                      or click to browse · JPG, PNG, WEBP · max 10 MB
                    </small>
                  </>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => choose(e.target.files[0])}
                />
              </label>

              <button
                className="primary full"
                disabled={!file || busy}
                onClick={scan}
              >
                {busy ? (
                  <>
                    <LoaderCircle className="spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze image <ScanSearch size={17} />
                  </>
                )}
              </button>

              <p className="hint">
                For best results, photograph the affected area in
                natural light and include the whole leaf.
              </p>
            </div>

            {/* ANALYSIS REPORT */}

            <div className="result-panel">
              <div className="result-title">
                <div>
                  <span className="eyebrow">ANALYSIS REPORT</span>
                  <h3>What we found</h3>
                </div>
                <span className="live">
                  <i /> AI status
                </span>
              </div>

              {!analysis ? (
                <div className="empty">
                  <ScanSearch size={34} />
                  <b>Your analysis will appear here</b>
                  <span>
                    Upload an image to begin. Predictions require trained models.
                  </span>
                </div>
              ) : (
                <div className="report">

                  {/* CROP IDENTIFICATION */}

                  <div className="report-item">
                    <span>Crop identification</span>
                    <b>
                      {analysis.crop_identification?.crop ||
                        analysis.crop_identification?.prediction ||
                        'Uncertain'}
                    </b>
                    <small>
                      {analysis.crop_identification?.message ||
                        'Crop identification information unavailable.'}
                    </small>
                  </div>

                  {/* DISEASE SCREENING */}

                  <div className="report-item">
                    <span>Disease screening</span>
                    <b>
                      {analysis.disease?.status === 'uncertain'
                        ? 'Uncertain'
                        : analysis.disease?.prediction ||
                          analysis.disease?.status?.replaceAll('_', ' ') ||
                          'Unavailable'}
                    </b>
                    <small>
                      {analysis.disease?.confidence != null
                        ? `Model confidence: ${(analysis.disease.confidence * 100).toFixed(1)}%`
                        : analysis.disease?.message ||
                          'Disease screening information unavailable.'}
                      {' · Screening result only; not a confirmed diagnosis.'}
                    </small>
                  </div>

                  {/* PEST DETECTION */}

                  <div className="report-item">
                    <span>Pest detection</span>
                    <b>
                      {analysis.pests?.detections?.length
                        ? analysis.pests.detections
                            .map((pest) => pest.label)
                            .join(', ')
                        : analysis.pests?.status === 'prediction'
                          ? 'No pests detected'
                          : analysis.pests?.status?.replaceAll('_', ' ') ||
                            'No result available'}
                    </b>
                    <small>
                      {analysis.pests?.detections?.length
                        ? analysis.pests.detections
                            .map((pest) =>
                              pest.confidence != null
                                ? `${pest.label}: ${(pest.confidence * 100).toFixed(1)}%`
                                : pest.label
                            )
                            .join(' | ')
                        : analysis.pests?.message ||
                          'No pests detected.'}
                    </small>
                  </div>

                  {/* SAFETY NOTE */}

                  <p className="safety">
                    <AlertTriangle size={16} />
                    {analysis.safety_note ||
                      'AI results are screening support, not a confirmed diagnosis. Consult an agricultural expert before applying pesticides.'}
                  </p>

                </div>
              )}
            </div>
          </div>
        </section>

        {/* WEATHER DASHBOARD */}

        <section className="section weather-section" id="weather">
          <div className="section-head">
            <div>
              <div className="eyebrow">LOCAL ENVIRONMENT</div>
              <h2>Know what’s happening outside.</h2>
              <p>
                Use your location to load live conditions and a five-day forecast.
              </p>
            </div>

            <button className="secondary" onClick={locate}>
              <MapPin size={16} /> Use my location
            </button>
          </div>

          <div className="weather-card">
            <div className="weather-main">
              <CloudSun size={38} />
              <div>
                <small>YOUR FIELD LOCATION</small>
                <h3>{place || 'Location not added'}</h3>
                <span>
                  {current
                    ? 'Current conditions'
                    : 'Allow location access to view weather'}
                </span>
              </div>
            </div>

            <div className="weather-metrics">
              <div>
                <small>Temperature</small>
                <b>
                  {current ? `${current.temperature_2m}°C` : '—'}
                </b>
              </div>

              <div>
                <small>Humidity</small>
                <b>
                  {current ? `${current.relative_humidity_2m}%` : '—'}
                </b>
              </div>

              <div>
                <small>Rainfall</small>
                <b>
                  {current ? `${current.precipitation} mm` : '—'}
                </b>
              </div>

              <div>
                <small>Wind</small>
                <b>
                  {current ? `${current.wind_speed_10m} km/h` : '—'}
                </b>
              </div>
            </div>
          </div>

          {weather?.daily && (
            <div className="forecast">
              {weather.daily.time.map((day, i) => (
                <div key={day}>
                  <small>
                    {new Date(day + 'T12:00:00').toLocaleDateString(
                      undefined,
                      { weekday: 'short' }
                    )}
                  </small>
                  <CloudSun />
                  <b>
                    {weather.daily.temperature_2m_max[i]}° /
                    {' '}
                    {weather.daily.temperature_2m_min[i]}°
                  </b>
                  <small>
                    Rain chance {weather.daily.precipitation_probability_max[i]}%
                  </small>
                </div>
              ))}
            </div>
          )}

          <p className="hint">
            Weather forecasts are environmental context, not a disease
            prediction. Check local advisories before field operations.
          </p>
        </section>

        {/* CULTIVATION GUIDANCE */}

        <section className="section advice-section">
          <div className="section-head">
            <div>
              <div className="eyebrow">PERSONALIZED CULTIVATION</div>
              <h2>Guidance for your growing season.</h2>
              <p>Start with your crop and field details.</p>
            </div>
          </div>

          <div className="advice-form">
            <label>
              Crop
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
              >
                {[
                  'Tomato',
                  'Rice',
                  'Wheat',
                  'Groundnut',
                  'Cotton',
                  'Maize',
                  'Chilli',
                  'Sugarcane',
                  'Other'
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>

            <label>
              Soil type
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
              >
                {[
                  'Not sure',
                  'Sandy',
                  'Clay',
                  'Loamy',
                  'Black soil',
                  'Red soil',
                  'Alluvial'
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>

            <label>
              Growth stage
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              >
                {[
                  'Sowing',
                  'Seedling',
                  'Vegetative',
                  'Flowering',
                  'Fruiting',
                  'Harvest'
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>

            <button className="primary" onClick={getAdvice}>
              Get cultivation guidance
            </button>
          </div>
        </section>

        {/* AI ASSISTANT */}

        <section className="section chatbot" id="assistant">
          <div>
            <div className="eyebrow">YOUR FARMING COMPANION</div>
            <h2>Questions from the field?</h2>
            <p>
              Ask about crop care, symptoms, irrigation or seasonal planning.
              Choose your preferred language above.
            </p>

            <div className="chat-note">
              <Languages />
              Multilingual responses depend on your configured AI language model.
            </div>
          </div>

          <form className="chatbox" onSubmit={ask}>
            <div className="chat-head">
              <span className="avatar">
                <MessageCircle />
              </span>

              <div>
                <b>AgroVision Assistant</b>
                <small>Farming information assistant</small>
              </div>

              <span className="online">● Ready</span>
            </div>

            <div className="chat-answer">
              {chat ||
                'Namaste! Ask me a question about your crop. Share your crop, location and growth stage for more useful guidance.'}
            </div>

            <div className="chat-input">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your farming question..."
                required
              />

              <button
                className="primary"
                disabled={chatBusy}
              >
                {chatBusy ? '...' : 'Send'}
              </button>
            </div>
          </form>
        </section>

      </main>

      {/* FOOTER */}

      <footer>
        <div className="brand">
          <span className="logo">
            <Sprout />
          </span>
          <span>
            AgroVision <b>AI</b>
            <small>SMART FARMING ASSISTANT</small>
          </span>
        </div>

        <span>Built for informed, sustainable farming.</span>

        <small>
          AI screening is not a substitute for agricultural expert diagnosis.
        </small>
      </footer>

    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);