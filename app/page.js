"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await res.json();
      setResult(data.result);
      setLoading(false);
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Deteksi Penyakit Daun 🌿</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {loading ? "Menganalisis..." : "Analisa"}
      </button>

      <p style={{ marginTop: 20 }}>{result}</p>
    </div>
  );
    }
