import { useEffect, useState } from "react";
import axios from "axios";

export default function ReadText() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [definition, setDefinition] = useState("");
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

  const handleWordClick = async (word) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord) return;
    setSelectedWord(cleanWord);
    setDefinition("Loading...");

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
      const data = await res.json();
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
      setDefinition(meaning || "No definition found.");
    } catch (err) {
      setDefinition("Error fetching definition.");
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-4 font-[OpenDyslexic, sans-serif] leading-relaxed tracking-wide bg-[#f0f6ff]">
      <h2 className="text-2xl font-bold mb-4">Reading View</h2>
      <div className="bg-white rounded p-4 shadow">
        {content.split("\n").map((line, idx) => (
          <p key={idx} className="mb-2">
            {line.split(" ").map((word, widx) => (
              <span
                key={widx}
                onClick={() => handleWordClick(word)}
                className="cursor-pointer text-blue-600 hover:underline mr-2"
              >
                {word}
              </span>
            ))}
          </p>
        ))}
      </div>

      {selectedWord && (
        <div className="mt-6 p-4 bg-white rounded shadow border border-blue-200">
          <strong className="text-lg">Definition of "{selectedWord}":</strong>
          <p className="mt-2">{definition}</p>
        </div>
      )}
    </div>
  );
}
