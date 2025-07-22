import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";
import StudentsList from "./pages/StudentsList";
import EditStudent from "./pages/EditStudent";
import UploadReader from "./pages/UploadReader";
import ReadText from "./pages/ReadText";

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="text-blue-600 mr-4">Home</Link>
          <Link to="/register" className="text-blue-600">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <h1 className="text-3xl font-bold text-center">Welcome to ReadIQ</h1>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Register />} />
          <Route path="/edit-profile" element={<ProfileEdit />} /> 
          <Route path="/students" element={<StudentsList />} />
          <Route path="/edit-student/:student_id" element={<EditStudent />} />
          <Route path="/upload-reader" element={<UploadReader />} /> 
          <Route path="/read-text" element={<ReadText />} />          
          <Route path="*" element={<Register />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
