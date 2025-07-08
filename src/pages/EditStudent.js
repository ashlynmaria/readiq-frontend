import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/DyslexiaFriendly.css";

export default function EditStudent() {
  const { student_id } = useParams(); // get ID from URL
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/protected/students", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const student = res.data.find((s) => s.id.toString() === student_id);
        if (!student) throw new Error("Student not found");
        setUsername(student.username);
        setEmail(student.email);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Failed to load student data.");
      });
  }, [student_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/protected/students/edit/${student_id}`,
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Student updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update student.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Student</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Email (read-only)</label>
          <input type="email" value={email} disabled />
        </div>
        <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Student"}
        </button>
      </form>
      <a href="/students" style={{ display: "block", marginTop: "1rem" }}>
        ← Back to Student List
      </a>
    </div>
  );
}
