import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Calendar,  User, LogOut, Info} from 'lucide-react';
import "./CouncilProfile.css";
import Footer from "./Footer";

const CouncilProfile = () => {
  const [student, setStudent] = useState({
    id: "",
    fullname: "",
    lastname: "",
    email: "",
    phNo: "",
    batch: "",
    course: "",
  });

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
      // Fetch student details
      axios
        .get(`http://localhost:8080/show/${userId}`)
        .then((response) => {
          setStudent(response.data);
        })
        .catch((error) => {
          setError("Error fetching student details");
          console.error("Error fetching student details:", error);
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
    <div className="council-profile-layout">
      <nav className="council-profile-navbar">
        <div className="council-profile-nav-left">
          <Link to="/" className="council-profile-logo-link">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="council-profile-nav-logo" />
          </Link>
        </div>
        <div className="council-profile-nav-right">
          <Link to="/CouncilDashboard" className="council-profile-nav-link ">Dashboard</Link>
          <Link to="/Councilprogram" className="council-profile-nav-link"><Calendar className="w-4 h-4 mr-2" />Programs</Link>
          <Link to="/Guidelines" className="council-profile-nav-link"><Info className="w-4 h-4 mr-2" />About</Link>
          <Link to="/CouncilProfile" className="council-profile-nav-link active"><User className="w-4 h-4 mr-2" />Profile</Link>
          <button className="council-profile-logout-btn" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</button>
        </div>
      </nav>

      <div 
        className="council-profile-student-profile" 
        style={{
          background: `url(${process.env.PUBLIC_URL + '/pic3.jpg'}) no-repeat center center fixed`,
          backgroundSize: 'cover',
        }}
      >
        <div className="council-profile-profile-container">
          <h1 className="council-profile-profile-title">Chairman Profile</h1>

          {error && <div className="council-profile-error-message">{error}</div>}

          {editMode ? (
            <div>
              <div className="council-profile-input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={student.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={student.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-input-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phNo"
                  value={student.phNo}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-input-group">
                <label>Batch</label>
                <input
                  type="text"
                  name="batch"
                  value={student.batch}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-input-group">
                <label>Course</label>
                <input
                  type="text"
                  name="course"
                  value={student.course}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-input-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={student.position}
                  onChange={handleChange}
                />
              </div>
              <div className="council-profile-edit-buttons">
                <button onClick={saveProfile} className="council-profile-btn council-profile-btn-save">
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="council-profile-profile-info">
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
                <strong>Position:</strong> {student.position}
              </p>
              <button onClick={() => setEditMode(true)} className="council-profile-btn council-profile-btn-edit">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CouncilProfile;