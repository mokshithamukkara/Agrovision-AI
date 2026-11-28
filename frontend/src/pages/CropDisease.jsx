
import React, { useEffect } from "react";

export default function CropDisease() {
  useEffect(() => {
    document.title = "AI Crop Disease Detection | PestEye AI";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Learn about AI crop disease detection, common plant disease symptoms, early screening, prevention and crop health guidance with PestEye AI.";
  }, []);

  const diseases = [
    {
      name: "Leaf Spot",
      symptoms: "Small brown or black spots appearing on leaves.",
      prevention: "Avoid overhead watering and remove badly affected leaves."
    },
    {
      name: "Powdery Mildew",
      symptoms: "White powder-like patches on the leaf surface.",
      prevention: "Maintain good airflow and monitor plant humidity."
    },
    {
      name: "Leaf Rust",
      symptoms: "Orange, yellow or brown powdery pustules on leaves.",
      prevention: "Use healthy planting material and monitor affected plants."
    },
    {
      name: "Bacterial Blight",
      symptoms: "Water-soaked patches that may turn brown or yellow.",
      prevention: "Use clean tools and avoid spreading infected plant material."
    }
  ];

  return (
    <main style={{
      fontFamily: "Arial, sans-serif",
      color: "#183b2b",
      background: "#f5faf5",
      minHeight: "100vh",
      padding: "30px 18px"
    }}>
      <div style={{ maxWidth: "1050px", margin: "auto" }}>

        <a href="/" style={{
          color: "#267447",
          fontWeight: "bold",
          textDecoration: "none"
        }}>
          ← Back to PestEye AI
        </a>

        <header style={{
          background: "linear-gradient(135deg,#123d2b,#28794a)",
          color: "white",
          padding: "55px 30px",
          borderRadius: "18px",
          marginTop: "22px",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "clamp(30px,5vw,46px)", margin: "0 0 15px" }}>
            AI Crop Disease Detection
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.7, maxWidth: "700px", margin: "auto" }}>
            Understand plant disease symptoms, screen leaf images using AI
            and make informed decisions for healthier crops.
          </p>
          <a href="/#scanner" style={{
            display: "inline-block",
            marginTop: "25px",
            background: "white",
            color: "#185b35",
            padding: "13px 25px",
            borderRadius: "9px",
            fontWeight: "bold",
            textDecoration: "none"
          }}>
            Scan Your Crop
          </a>
        </header>

        <section style={{ padding: "35px 0 15px" }}>
          <h2>What Is Crop Disease Detection?</h2>
          <p style={{ lineHeight: 1.8 }}>
            Crop disease detection is the process of identifying possible
            plant health problems by examining visible symptoms. AI-based
            screening tools analyse photographs of leaves and look for
            patterns associated with particular conditions.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            PestEye AI provides preliminary image-based screening to help
            farmers investigate crop health concerns. Results should always
            be checked against field conditions and expert advice.
          </p>
        </section>

        <section style={{ padding: "20px 0" }}>
          <h2>Common Plant Disease Symptoms</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
            marginTop: "20px"
          }}>
            {diseases.map((disease) => (
              <article key={disease.name} style={{
                background: "white",
                border: "1px solid #dceade",
                borderRadius: "13px",
                padding: "22px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.04)"
              }}>
                <h3 style={{ color: "#247346" }}>{disease.name}</h3>
                <p style={{ lineHeight: 1.7 }}>
                  <strong>Symptoms:</strong> {disease.symptoms}
                </p>
                <p style={{ lineHeight: 1.7 }}>
                  <strong>Prevention:</strong> {disease.prevention}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ padding: "25px 0" }}>
          <h2>How to Screen a Crop Image</h2>
          <ol style={{ lineHeight: 2 }}>
            <li>Choose a clear photograph of the affected plant leaf.</li>
            <li>Capture the leaf in natural light.</li>
            <li>Keep the affected area visible and in focus.</li>
            <li>Upload the image to the PestEye AI scanner.</li>
            <li>Review the result and seek expert confirmation.</li>
          </ol>
        </section>

        <section style={{
          background: "#e6f3e8",
          borderRadius: "14px",
          padding: "25px",
          margin: "20px 0"
        }}>
          <h2>Ways to Support Crop Health</h2>
          <ul style={{ lineHeight: 2 }}>
            <li>Inspect plants regularly for unusual symptoms.</li>
            <li>Use healthy seeds and disease-free planting material.</li>
            <li>Maintain suitable spacing and field drainage.</li>
            <li>Remove infected plant debris safely.</li>
            <li>Seek local agricultural guidance before treatment.</li>
          </ul>
        </section>

        <section style={{ textAlign: "center", padding: "30px 10px" }}>
          <h2>Start Your Crop Health Check</h2>
          <p style={{ lineHeight: 1.7 }}>
            Use PestEye AI to screen a plant image and learn more about
            possible crop health concerns.
          </p>
          <a href="/#scanner" style={{
            display: "inline-block",
            background: "#247346",
            color: "white",
            padding: "14px 26px",
            borderRadius: "9px",
            textDecoration: "none",
            fontWeight: "bold"
          }}>
            Visit PestEye AI Scanner
          </a>
        </section>

        <footer style={{
          borderTop: "1px solid #dceade",
          padding: "20px 0",
          fontSize: "13px",
          color: "#607468",
          lineHeight: 1.7
        }}>
          AI screening is not a confirmed diagnosis. Consult an agricultural
          expert before selecting crop treatments.
        </footer>

      </div>
    </main>
  );
}
