import { useState } from "react";
import axios from "axios";

export default function UploadReader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("access_token");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/protected/reading/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`Uploaded! Go read "${res.data.filename}"`);
      localStorage.setItem("readiq_last_file", res.data.filename); // Save for ReadText
    } catch (err) {
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Reading File</h2>
      <input type="file" accept=".txt" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded" onClick={handleUpload}>
        Upload
      </button>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
}
