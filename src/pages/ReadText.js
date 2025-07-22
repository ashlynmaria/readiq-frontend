import { useEffect, useState } from "react";
import axios from "axios";

export default function ReadText() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [definitions, setDefinitions] = useState({});
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

  const fetchDefinition = async (word) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord || definitions[cleanWord]) return;

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
      const data = await res.json();
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
      setDefinitions((prev) => ({ ...prev, [cleanWord]: meaning }));
    } catch (err) {
      setDefinitions((prev) => ({ ...prev, [cleanWord]: "Error fetching definition." }));
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-4 font-[OpenDyslexic, sans-serif] leading-relaxed tracking-wide bg-[#f0f6ff]">
      <h2 className="text-2xl font-bold mb-4">Reading View</h2>
      <div className="bg-white rounded p-4 shadow">
        {content.split("\n").map((line, idx) => (
          <p key={idx} className="mb-2">
            {line.split(" ").map((word, widx) => {
              const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
              return (
                <span
                  key={widx}
                  onMouseEnter={() => fetchDefinition(cleanWord)}
                  className="cursor-pointer text-blue-600 hover:underline mr-2 relative group"
                >
                  <span className="group-hover:block hidden absolute bottom-full mb-1 w-max max-w-xs bg-black text-white text-xs px-2 py-1 rounded shadow z-10">
                    {definitions[cleanWord] || "Fetching..."}
                  </span>
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
}
