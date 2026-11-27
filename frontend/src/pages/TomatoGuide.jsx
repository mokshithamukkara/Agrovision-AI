import React, { useEffect } from "react";

export default function TomatoGuide() {
  useEffect(() => {
    document.title = "Tomato Plant Diseases and Care Guide | PestEye AI";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "Learn about common tomato plant diseases, visible symptoms, prevention and practical tomato crop care.";
  }, []);

  return (
    <div className="seo-page">
      <h1>Tomato Plant Diseases and Crop Care Guide</h1>

      <p>
        Tomato is an important vegetable crop. Changes in leaf colour,
        spots, wilting and fruit damage can indicate disease,
        environmental stress or pest problems.
      </p>

      <h2>Common Tomato Plant Problems</h2>

      <h3>Early Blight</h3>
      <p>
        Early blight can cause brown spots with circular patterns
        on older leaves. Infected leaves may gradually turn yellow.
      </p>

      <h3>Late Blight</h3>
      <p>
        Late blight may produce irregular, dark water-soaked patches
        on leaves and stems. It can spread quickly in favourable
        environmental conditions.
      </p>

      <h3>Leaf Curl</h3>
      <p>
        Tomato leaves may curl due to viral infections, insect
        activity, heat or other environmental stresses.
      </p>

      <h2>Tomato Crop Care Tips</h2>
      <ul>
        <li>Use healthy seeds and suitable varieties.</li>
        <li>Provide adequate sunlight and proper spacing.</li>
        <li>Avoid unnecessary waterlogging.</li>
        <li>Inspect leaves and stems regularly.</li>
        <li>Follow local agricultural recommendations.</li>
      </ul>

      <p>
        <strong>Important:</strong> These symptoms are general
        indicators, not a confirmed diagnosis. Seek expert advice
        before treatment.
      </p>

      <a href="/">← Back to PestEye AI Home</a>
    </div>
  );
}