
import React, { useEffect } from "react";

export default function TomatoGuide() {
  useEffect(() => {
    document.title = "Tomato Disease Guide: Symptoms & Prevention | PestEye AI";

    const description =
      "Identify common tomato plant diseases including early blight and late blight. Learn symptoms, prevention and tomato crop care.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://pesteye-ai.pages.dev/tomato-disease-guide";
  }, []);

  const problems = [
    {
      name: "Early Blight",
      symptoms: "Brown circular spots, often with concentric rings, usually appearing on older leaves.",
      care: "Remove badly affected leaves, improve airflow and avoid overhead watering."
    },
    {
      name: "Late Blight",
      symptoms: "Irregular dark, water-soaked patches on leaves and stems. White growth may appear in humid conditions.",
      care: "Remove infected plant material safely, avoid wet foliage and seek local agricultural advice promptly."
    },
    {
      name: "Leaf Curl",
      symptoms: "Leaves may curl upward or downward, sometimes with yellowing or reduced plant growth.",
      care: "Check for whiteflies, heat stress and watering problems. Use healthy planting material."
    },
    {
      name: "Bacterial Spot",
      symptoms: "Small dark spots may appear on leaves, stems and fruits, sometimes with yellow edges.",
      care: "Use clean seeds, avoid handling wet plants and remove infected plant debris."
    }
  ];

  const tips = [
    "Use healthy seeds and disease-tolerant varieties.",
    "Provide adequate sunlight and proper plant spacing.",
    "Water near the soil instead of wetting leaves.",
    "Avoid waterlogging and maintain good drainage.",
    "Inspect leaves, stems and fruits regularly.",
    "Remove infected plant debris from the growing area."
  ];

  return (
    <main style={{
      maxWidth: "1050px",
      margin: "0 auto",
      padding: "36px 20px",
      color: "#20352a",
      fontFamily: "Arial, sans-serif",
      lineHeight: 1.7
    }}>
      <section style={{
        background: "linear-gradient(135deg, #123d2b, #26834d)",
        color: "white",
        padding: "45px 28px",
        borderRadius: "20px",
        marginBottom: "32px"
      }}>
        <p style={{ color: "#c9f5d6", fontWeight: "bold" }}>
          PESTEYE AI · TOMATO CROP GUIDE
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.2 }}>
          Tomato Plant Diseases and Crop Care Guide
        </h1>
        <p>
          Learn to recognise common tomato plant problems, understand
          their symptoms and follow practical prevention methods.
        </p>
        <a href="/#scanner" style={{
          display: "inline-block",
          background: "#ffffff",
          color: "#17633a",
          padding: "12px 22px",
          borderRadius: "9px",
          textDecoration: "none",
          fontWeight: "bold",
          marginTop: "12px"
        }}>
          Scan a Plant Image
        </a>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Understanding Tomato Plant Diseases</h2>
        <p>
          Tomato is an important vegetable crop. Changes in leaf colour,
          spots, wilting and fruit damage can indicate diseases, pest
          activity or environmental stress. Early observation helps
          farmers respond before problems spread.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Common Tomato Plant Problems</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "18px"
        }}>
          {problems.map((problem) => (
            <article key={problem.name} style={{
              padding: "22px",
              border: "1px solid #dce9df",
              borderRadius: "14px",
              background: "#f7fbf8"
            }}>
              <h3 style={{ color: "#17633a", marginTop: 0 }}>
                {problem.name}
              </h3>
              <p><strong>Symptoms:</strong> {problem.symptoms}</p>
              <p><strong>Prevention and care:</strong> {problem.care}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Tomato Crop Care Tips</h2>
        <ul>
          {tips.map((tip) => (
            <li key={tip} style={{ marginBottom: "9px" }}>{tip}</li>
          ))}
        </ul>
      </section>

      <section style={{
        background: "#edf7ef",
        padding: "24px",
        borderRadius: "14px",
        marginBottom: "28px"
      }}>
        <h2>Use AI to Screen Tomato Plant Images</h2>
        <p>
          PestEye AI helps screen plant images for possible crop health
          issues. Upload a clear image to explore an AI-generated result.
        </p>
        <a href="/#scanner" style={{
          color: "#17633a",
          fontWeight: "bold"
        }}>
          Go to PestEye AI Scanner →
        </a>
      </section>

      <p style={{ fontSize: "14px", color: "#64746a" }}>
        <strong>Important:</strong> Visible symptoms can have multiple
        causes. AI screening is not a confirmed diagnosis. Consult an
        agricultural expert before choosing a treatment.
      </p>

      <a href="/" style={{ color: "#17633a", fontWeight: "bold" }}>
        ← Back to PestEye AI Home
      </a>
    </main>
  );
}
