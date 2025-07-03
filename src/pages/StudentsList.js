import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/protected/students", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Failed to load students");
        setLoading(false);
      });
  }, []);

  const handleDeactivate = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/protected/students/${id}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Student deactivated");
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active: false } : s))
      );
    } catch {
      setMessage("❌ Failed to deactivate");
    }
  };

  const handleReactivate = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/protected/students/${id}/reactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Student reactivated");
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active: true } : s))
      );
    } catch {
      setMessage("❌ Failed to reactivate");
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Students</h1>

      {message && <p>{message}</p>}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "2rem",
        }}
      >
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Username</th>
            <th style={th}>Email</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={td}>{student.id}</td>
              <td style={td}>{student.username}</td>
              <td style={td}>{student.email}</td>
              <td style={td}>{student.is_active ? "Active" : "Inactive"}</td>
              <td style={td}>
                <button
                  style={button}
                  onClick={() => navigate(`/edit-student/${student.id}`)}
                >
                  Edit
                </button>
                {student.is_active ? (
                  <button
                    style={button}
                    onClick={() => handleDeactivate(student.id)}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    style={button}
                    onClick={() => handleReactivate(student.id)}
                  >
                    Reactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: "0.5rem",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};

const button = {
  marginRight: "0.5rem",
  padding: "0.5rem 1rem",
  cursor: "pointer",
};
