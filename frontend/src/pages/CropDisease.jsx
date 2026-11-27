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
      "Learn how AI crop disease detection helps farmers screen plant leaf images, identify possible symptoms and make informed crop-care decisions.";
  }, []);

  return (
    <div className="seo-page">
      <h1>AI Crop Disease Detection</h1>

      <p>
        Crop diseases can affect plant growth, crop quality and farm income.
        Identifying possible symptoms early helps farmers investigate problems
        and seek suitable agricultural advice.
      </p>

      <h2>How Does AI Crop Disease Detection Work?</h2>
      <p>
        AI crop disease detection uses image analysis to examine photographs
        of plant leaves. A trained model analyses visible patterns and
        provides a possible classification.
      </p>

      <h2>How to Check a Plant Image</h2>
      <ol>
        <li>Choose a clear photograph of the affected leaf.</li>
        <li>Make sure the leaf is well lit and visible.</li>
        <li>Upload the image to the PestEye AI scanner.</li>
        <li>Review the screening result and suggested information.</li>
      </ol>

      <h2>Why Is Early Detection Important?</h2>
      <p>
        Early screening can help farmers investigate unusual spots,
        discolouration and other visible symptoms before crop problems
        become more serious.
      </p>

      <p>
        <strong>Important:</strong> AI results are preliminary screening
        information, not a confirmed diagnosis. Consult an agricultural
        expert before choosing a treatment.
      </p>

      <a href="/">← Back to PestEye AI Home</a>
    </div>
  );
}