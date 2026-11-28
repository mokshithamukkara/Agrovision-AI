
import React, { useEffect } from "react";

export default function PestIdentification() {
  useEffect(() => {
    document.title = "AI Plant Pest Identification | PestEye AI";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Learn to identify common crop pests, recognise insect damage and explore responsible pest management with PestEye AI.";

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://pesteye-ai.pages.dev/plant-pest-identification";
  }, []);

  const pests = [
    {
      name: "Aphids",
      symptoms: "Small insects clustered on young shoots and leaf undersides. Leaves may curl or become distorted.",
      management: "Monitor new growth, conserve natural predators and seek local advice for severe infestations."
    },
    {
      name: "Whiteflies",
      symptoms: "Tiny white insects that fly up when disturbed. Leaves may yellow and become weak.",
      management: "Inspect leaf undersides, remove heavily infested leaves where appropriate and monitor regularly."
    },
    {
      name: "Caterpillars",
      symptoms: "Irregular holes, chewed leaf edges and visible larvae or droppings.",
      management: "Inspect plants regularly and use suitable physical or biological controls based on expert guidance."
    },
    {
      name: "Thrips",
      symptoms: "Silvery streaks, pale patches and distorted young leaves or flowers.",
      management: "Check flowers and young leaves, remove heavily affected plant debris and monitor pest levels."
    },
    {
      name: "Spider Mites",
      symptoms: "Fine pale speckles on leaves, sometimes with delicate webbing underneath.",
      management: "Check leaf undersides, reduce plant stress and obtain advice on appropriate control methods."
    },
    {
      name: "Stem Borers",
      symptoms: "Holes in stems, damaged growing points, wilting or visible frass near entry holes.",
      management: "Inspect stems, remove affected plant material appropriately and follow crop-specific recommendations."
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
            AI Plant Pest Identification
          </h1>
          <p style={{
            fontSize: "17px",
            lineHeight: 1.7,
            maxWidth: "720px",
            margin: "auto"
          }}>
            Learn to recognise common agricultural pests, understand
            their damage and explore responsible crop protection.
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
            Scan a Plant Image
          </a>
        </header>

        <section style={{ padding: "35px 0 15px" }}>
          <h2>Why Is Pest Identification Important?</h2>
          <p style={{ lineHeight: 1.8 }}>
            Agricultural pests can affect leaves, stems, roots, flowers
            and fruits. Recognising unusual insect activity and damage
            early helps farmers investigate crop problems and choose
            appropriate management strategies.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            AI image screening can assist by examining visible patterns
            in uploaded photographs. Its results depend on image quality
            and the pest categories supported by the trained model.
          </p>
        </section>

        <section style={{ padding: "20px 0" }}>
          <h2>Common Agricultural Pests and Their Symptoms</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "18px",
            marginTop: "20px"
          }}>
            {pests.map((pest) => (
              <article key={pest.name} style={{
                background: "white",
                border: "1px solid #dceade",
                borderRadius: "13px",
                padding: "22px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.04)"
              }}>
                <h3 style={{ color: "#247346" }}>{pest.name}</h3>
                <p style={{ lineHeight: 1.7 }}>
                  <strong>Common signs:</strong> {pest.symptoms}
                </p>
                <p style={{ lineHeight: 1.7 }}>
                  <strong>Management:</strong> {pest.management}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ padding: "25px 0" }}>
          <h2>How to Use AI for Pest Screening</h2>
          <ol style={{ lineHeight: 2 }}>
            <li>Photograph the affected plant or visible insect.</li>
            <li>Use good lighting and keep the subject in focus.</li>
            <li>Upload the image to the PestEye AI scanner.</li>
            <li>Review the detected categories and confidence values.</li>
            <li>Confirm the suspected pest before deciding on treatment.</li>
          </ol>
        </section>

        <section style={{
          background: "#e6f3e8",
          borderRadius: "14px",
          padding: "25px",
          margin: "20px 0"
        }}>
          <h2>Responsible Pest Management</h2>
          <ul style={{ lineHeight: 2 }}>
            <li>Inspect crops regularly for insects and damage.</li>
            <li>Maintain field cleanliness and suitable crop spacing.</li>
            <li>Protect beneficial insects and natural predators.</li>
            <li>Use integrated pest management where appropriate.</li>
            <li>Follow local agricultural recommendations for treatment.</li>
          </ul>
        </section>

        <section style={{ textAlign: "center", padding: "30px 10px" }}>
          <h2>Protect Your Crops with Better Information</h2>
          <p style={{ lineHeight: 1.7 }}>
            Explore PestEye AI image screening and learn more about
            possible agricultural pest problems.
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
          AI pest screening is not a confirmed identification.
          Consult an agricultural expert before applying pesticides.
        </footer>

      </div>
    </main>
  );
}
