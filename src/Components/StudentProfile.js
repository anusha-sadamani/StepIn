import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Edit, Save } from "lucide-react";
import "./StudentProfile.css";
import Footer from "./Footer";

const StudentProfile = () => {
  const [student, setStudent] = useState({
    id: "",
    fullname: "",
    lastname: "",
    email: "",
    phNo: "",
    batch: "",
    course: "",
    skills: [],
  });

  const [programs, setPrograms] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    alert("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/show/${userId}`)
        .then((response) => {
          setStudent(response.data);
        })
        .catch((error) => {
          setError("Error fetching student details");
          console.error("Error fetching student details:", error);
        });

      axios
        .get(`http://localhost:8080/user/${userId}/programs`)
        .then((response) => {
          setPrograms(response.data);
        })
        .catch((error) => {
          setError("Error fetching joined programs");
          console.error("Error fetching joined programs:", error);
        });

      axios
        .get(`http://localhost:8080/user/${userId}/skills`)
        .then((response) => {
          setStudent((prevStudent) => ({
            ...prevStudent,
            skills: response.data,
          }));
        })
        .catch((error) => {
          console.error("Error fetching skills:", error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      skills: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const saveProfile = () => {
    if (userId) {
      axios
        .put(`http://localhost:8080/edit/${userId}`, student)
        .then((response) => {
          setStudent(response.data);
          setEditMode(false);
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("Error updating profile");
        });
    }
  };

  return (
    <div className="student-profile-container">
      <nav className="student-profile-navbar">
        <div className="student-profile-nav-left">
          <Link to="/" className="student-profile-logo-link">
            <img src="/logo.png" alt="StepIn Logo" className="about-nav-logo" />
          </Link>
        </div>
        <div className="student-profile-nav-right">
          <Link to="/StudentDashboard" className="student-profile-nav-link">
            Dashboard
          </Link>
          <Link to="/program" className="student-profile-nav-link">
            Programs
          </Link>
          <Link to="/about" className="student-profile-nav-link">
            About
          </Link>
          <Link to="/StudentProfile" className="student-profile-nav-link active">
            Profile
          </Link>
          <button className="student-profile-logout-btn" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </nav>
      <div className="content-wrapper">
        <div className="profile-container">
          <div className="profile-grid">
            <div className="profile-details">
              <h2 className="section-title">Student Profile</h2>
              {error && <div className="error-message">{error}</div>}

              {editMode ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveProfile();
                  }}
                  className="edit-form"
                >
                  <div className="input-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={student.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={student.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={student.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phNo"
                      value={student.phNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Batch</label>
                    <input
                      type="text"
                      name="batch"
                      value={student.batch}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Course</label>
                    <input
                      type="text"
                      name="course"
                      value={student.course}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Skills</label>
                    <input
                      type="text"
                      name="skills"
                      value={student.skills.join(", ")}
                      onChange={handleSkillsChange}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-cancel"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-save">
                      <Save className="btn-icon" /> Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <p>
                    <strong>First Name:</strong> {student.fullname}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {student.lastname}
                  </p>
                  <p>
                    <strong>Email:</strong> {student.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {student.phNo}
                  </p>
                  <p>
                    <strong>Batch:</strong> {student.batch}
                  </p>
                  <p>
                    <strong>Course:</strong> {student.course}
                  </p>
                  <p>
                    <strong>Skills:</strong> {student.skills.join(", ")}
                  </p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="btn btn-edit"
                  >
                    <Edit className="btn-icon" /> Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="programs-section">
              <h2 className="section-title">Joined Programs</h2>
              {programs.length > 0 ? (
                <div className="programs-list">
                  {programs.map((program) => (
                    <div key={program.id} className="program-card">
                      <h3 className="program-name">{program.name}</h3>
                      <p className="program-description">
                        {program.description}
                      </p>
                      <div className="program-status">
                        <span className="status-badge">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-programs">
                  <p>No programs joined yet.</p>
                  <Link to="/program" className="btn btn-primary">
                    Browse Programs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentProfile;