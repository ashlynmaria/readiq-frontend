import { useEffect, useState } from "react";
import axios from "axios";

export default function ReadText() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("access_token");
  const filename = localStorage.getItem("readiq_last_file");

  useEffect(() => {
    if (!filename) {
      setError("No file selected. Please upload a file first.");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/protected/reading/read/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContent(res.data.content))
      .catch(() => setError("Could not load file."));
  }, [filename]);

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-4 font-[OpenDyslexic, sans-serif] leading-relaxed tracking-wide bg-[#f0f6ff]">
      <h2 className="text-2xl font-bold mb-4">Reading View</h2>
      <div className="bg-white rounded p-4 shadow">
        {content.split("\n").map((line, idx) => (
          <p key={idx} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
}
