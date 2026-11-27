import React, { useEffect } from "react";

export default function PestIdentification() {
  useEffect(() => {
    document.title = "Plant Pest Identification Using AI | PestEye AI";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Explore AI-based plant pest identification, common pest symptoms and ways to protect crops through informed farming practices.";
  }, []);

  return (
    <div className="seo-page">
      <h1>Plant Pest Identification Using AI</h1>

      <p>
        Insects and pests can damage leaves, stems, roots and fruits.
        Identifying visible pest symptoms helps farmers investigate
        crop problems and protect plant health.
      </p>

      <h2>How Does AI Pest Identification Work?</h2>
      <p>
        AI image analysis examines photographs to identify visible
        patterns associated with supported pest categories. The result
        can help farmers understand what to investigate further.
      </p>

      <h2>Common Signs of Pest Damage</h2>
      <ul>
        <li>Small holes or irregular marks on leaves.</li>
        <li>Yellowing, curling or damaged leaves.</li>
        <li>Visible insects or eggs on plant surfaces.</li>
        <li>Unusual damage to stems, flowers or fruits.</li>
      </ul>

      <h2>How Can Farmers Protect Crops?</h2>
      <p>
        Regularly inspect crops, remove heavily affected plant parts
        when appropriate, maintain field hygiene and seek local
        agricultural advice for suitable pest management.
      </p>

      <p>
        <strong>Note:</strong> AI screening is not a confirmed pest
        diagnosis. Consult an agricultural expert before applying
        pesticides or other treatments.
      </p>

      <a href="/">← Back to PestEye AI Home</a>
    </div>
  );
}