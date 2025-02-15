import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./About.css";
import Footer from "./Footer";
import { LogOut } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="about-dashboard-layout">
      {/* Navigation Bar */}
      <nav className="about-navbar">
        <div className="about-nav-left">
          <Link to="/" className="about-logo-link">
            <img src="/logo.png" alt="StepIn Logo" className="about-nav-logo" />
          </Link>
        </div>
        <div className="about-nav-right">
          <Link to="/StudentDashboard" className="about-nav-link">
            Dashboard
          </Link>
          <Link to="/program" className="about-nav-link">
            Programs
          </Link>
          <Link to="/about" className="about-nav-link active">
            About
          </Link>
          <Link to="/StudentProfile" className="about-nav-link">
            Profile
          </Link>
          <button className="about-logout-btn" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="about-content"
        style={{
          background: `url('/pic.jpg') no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <div className="about-content-box">
          <h2>About StepIn</h2>
          <p>
            StepIn is a web-based voluntary application designed to bridge
            communication and collaboration between students and council members.
            The platform empowers students to stay updated on the latest programs
            and events organized by their councils, while providing council members
            with tools to effectively announce and manage these programs.
          </p>
          <div>
            <h3>Features for Students</h3>
            <ul>
              <li>Explore and join announced programs.</li>
              <li>Manage personal profiles with ease.</li>
              <li>Stay notified about programs they've joined.</li>
            </ul>
          </div>
          <div>
            <h3>Features for Council Members</h3>
            <ul>
              <li>Seamlessly announce and manage programs.</li>
              <li>View participant lists and send updates or reminders.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;