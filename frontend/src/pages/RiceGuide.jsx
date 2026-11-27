import React, { useEffect } from "react";

export default function RiceGuide() {
  useEffect(() => {
    document.title = "Rice Plant Diseases and Crop Care Guide | PestEye AI";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Explore common rice crop diseases, visible symptoms, prevention methods and practical rice cultivation guidance.";
  }, []);

  return (
    <div className="seo-page">
      <h1>Rice Plant Diseases and Crop Care Guide</h1>

      <p>
        Rice is one of the most important food crops. Disease,
        pests and unsuitable growing conditions can affect rice
        plant health and crop yield.
      </p>

      <h2>Common Rice Plant Diseases</h2>

      <h3>Rice Blast</h3>
      <p>
        Rice blast may cause spindle-shaped spots with grey centres
        and darker edges on leaves. It can also affect other parts
        of the rice plant.
      </p>

      <h3>Bacterial Leaf Blight</h3>
      <p>
        This disease can cause yellowing and drying along leaf
        margins. In severe cases, affected leaves may become
        completely dry.
      </p>

      <h3>Sheath Blight</h3>
      <p>
        Sheath blight commonly produces oval or irregular lesions
        on the leaf sheath near the water level.
      </p>

      <h2>Rice Crop Care Tips</h2>
      <ul>
        <li>Use healthy seeds and recommended varieties.</li>
        <li>Maintain suitable spacing between plants.</li>
        <li>Monitor water and nutrient management.</li>
        <li>Inspect fields regularly for disease symptoms.</li>
        <li>Follow local agricultural recommendations.</li>
      </ul>

      <p>
        <strong>Important:</strong> Symptoms can look similar
        across different problems. Consult an agricultural expert
        before selecting a treatment.
      </p>

      <a href="/">← Back to PestEye AI Home</a>
    </div>
  );
}