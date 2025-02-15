import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

function Signup() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    batch: "",
    course: "",
    password: "",
    confirmPassword: "",
    skills: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@mariancollege\.org$/;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{10,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (Object.values(formData).some(value => value === "")) {
      setError("Please fill out all fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please use a valid Marian College email.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError("Password must be at least 10 characters long and contain at least one number, one letter, and one special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      fullname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      phNo: formData.phoneNumber,
      batch: formData.batch,
      course: formData.course,
      password: formData.password,
      skills: formData.skills.split(",").map(skill => skill.trim()),
      role: "student"
    };

    try {
      const response = await fetch("http://localhost:8080/api/save", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers([...users, data]);
        navigate("/Login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Failed to connect to server. Please try again later.");
    }
  };

  return (
    <div className="signup-container"
    style={{
      background: `url('/pic2.jpg') no-repeat center center fixed`,
      backgroundSize: 'cover',
    }}>
      <div className="signup-form-container">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join our Programs</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@mariancollege.org"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="10-digit phone number"
              />
            </div>
            <div className="form-group">
              <label>Batch</label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
              >
                <option value="">Select Batch</option>
                {[2020, 2021, 2022, 2023, 2024].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
              >
                <option value="">Select Course</option>
                {['BCA', 'BBA', 'BSc', 'BCom', 'BA'].map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Separate skills with commas"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-btn">Create Account</button>
            <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;