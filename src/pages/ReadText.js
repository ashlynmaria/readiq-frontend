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
        headers: { Authorization: `Bearer ${token}` },
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

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => window.speechSynthesis.pause();
  const resumeSpeech = () => window.speechSynthesis.resume();
  const stopSpeech = () => window.speechSynthesis.cancel();

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-4 font-[OpenDyslexic, sans-serif] leading-relaxed tracking-wide bg-[#f0f6ff]">
      <h2 className="text-2xl font-bold mb-4">Reading View</h2>

      {/* Global TTS Controls */}
      <div className="mb-4 flex gap-4 text-sm">
        <button onClick={pauseSpeech} className="px-2 py-1 bg-yellow-200 hover:bg-yellow-300 rounded">⏸ Pause</button>
        <button onClick={resumeSpeech} className="px-2 py-1 bg-green-200 hover:bg-green-300 rounded">▶️ Resume</button>
        <button onClick={stopSpeech} className="px-2 py-1 bg-red-200 hover:bg-red-300 rounded">🔇 Stop</button>
      </div>

      <div className="bg-white rounded p-4 shadow">
        {content.split("\n").map((line, idx) => (
          <div key={idx} className="mb-4">
            <p className="mb-1 flex flex-wrap gap-1">
              {line.split(" ").map((word, widx) => {
                const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
                return (
                  <span
                    key={widx}
                    onMouseEnter={() => fetchDefinition(cleanWord)}
                    onClick={() => speakText(cleanWord)}
                    className="cursor-pointer text-blue-600 hover:underline relative group"
                  >
                    <span className="group-hover:block hidden absolute bottom-full mb-1 w-max max-w-xs bg-black text-white text-xs px-2 py-1 rounded shadow z-10">
                      {definitions[cleanWord] || "Fetching..."}
                    </span>
                    {word}
                  </span>
                );
              })}
            </p>

            {/* 📣 Speak entire line button */}
            <button
              onClick={() => speakText(line)}
              className="mt-1 text-xs text-gray-500 hover:text-blue-600"
            >
              📣 Speak entire line
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
