
import React, { useEffect } from "react";

export default function RiceGuide() {
  useEffect(() => {
    document.title = "Rice Plant Diseases: Symptoms & Prevention | PestEye AI";

    const description =
      "Learn to identify common rice diseases including rice blast, bacterial leaf blight and sheath blight. Explore symptoms and prevention tips.";

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
    canonical.href = "https://pesteye-ai.pages.dev/rice-disease-guide";
  }, []);

  const diseases = [
    {
      name: "Rice Blast",
      symptoms: "Spindle-shaped leaf spots with grey or whitish centres and dark brown edges. Nodes and panicles may also be affected.",
      care: "Use recommended resistant varieties, balanced fertiliser and healthy seeds. Monitor fields regularly."
    },
    {
      name: "Bacterial Leaf Blight",
      symptoms: "Yellowing and drying along leaf margins. In severe cases, leaves may become completely dry.",
      care: "Use healthy seeds, maintain field hygiene and avoid excessive nitrogen application."
    },
    {
      name: "Sheath Blight",
      symptoms: "Oval or irregular greenish-grey lesions on leaf sheaths, often near the water level.",
      care: "Maintain suitable plant spacing, avoid excessive nitrogen and monitor dense crop areas."
    },
    {
      name: "Brown Spot",
      symptoms: "Small circular or oval brown spots may appear on leaves, sometimes with grey centres.",
      care: "Use healthy seeds, maintain balanced crop nutrition and improve field management."
    }
  ];

  const tips = [
    "Use certified, healthy seeds and suitable varieties.",
    "Maintain recommended spacing between plants.",
    "Manage irrigation and drainage appropriately.",
    "Apply fertilisers according to soil and crop requirements.",
    "Inspect leaves, stems and panicles regularly.",
    "Remove infected crop residues where recommended."
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
          PESTEYE AI · RICE CROP GUIDE
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.2 }}>
          Rice Plant Diseases and Crop Care Guide
        </h1>
        <p>
          Understand common rice diseases, recognise visible symptoms
          and learn practical ways to support healthier rice crops.
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
        <h2>Understanding Rice Crop Diseases</h2>
        <p>
          Rice is one of the world's most important food crops.
          Diseases, pests and unsuitable growing conditions can affect
          plant health and crop yield. Regular field observation helps
          farmers notice problems early.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Common Rice Plant Diseases</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "18px"
        }}>
          {diseases.map((disease) => (
            <article key={disease.name} style={{
              padding: "22px",
              border: "1px solid #dce9df",
              borderRadius: "14px",
              background: "#f7fbf8"
            }}>
              <h3 style={{ color: "#17633a", marginTop: 0 }}>
                {disease.name}
              </h3>
              <p><strong>Symptoms:</strong> {disease.symptoms}</p>
              <p><strong>Prevention and care:</strong> {disease.care}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Rice Crop Care Tips</h2>
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
        <h2>AI-Based Rice Plant Screening</h2>
        <p>
          PestEye AI helps screen plant images for possible crop health
          problems. Upload a clear rice plant image to explore an
          AI-generated result.
        </p>
        <a href="/#scanner" style={{
          color: "#17633a",
          fontWeight: "bold"
        }}>
          Go to PestEye AI Scanner →
        </a>
      </section>

      <p style={{ fontSize: "14px", color: "#64746a" }}>
        <strong>Important:</strong> Similar symptoms can have different
        causes. AI screening is not a confirmed diagnosis. Consult a
        local agricultural expert before selecting a treatment.
      </p>

      <a href="/" style={{ color: "#17633a", fontWeight: "bold" }}>
        ← Back to PestEye AI Home
      </a>
    </main>
  );
}
