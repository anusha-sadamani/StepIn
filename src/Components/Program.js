import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Search, Calendar, Clock, MapPin, User } from 'lucide-react';
import "./Program.css";
import Footer from "./Footer";

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/programs");
        setPrograms(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setError("Failed to fetch programs. Please try again later.");
      }
    };
    fetchPrograms();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(search)
  );

  if (error) {
    return (
      <div className="program-error-container">
        <div className="program-error-message">{error}</div>
      </div>
    );
  }

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="program-dashboard-layout">
      <nav className="program-navbar">
              <div className="program-nav-left">
                <Link to="/" className="program-logo-link">
                  <img src="/logo.png" alt="StepIn Logo" className="program-nav-logo" />
                </Link>
              </div>
              <div className="program-nav-right">
                <Link to="/StudentDashboard" className="program-nav-link">
                  Dashboard
                </Link>
                <Link to="/program" className="program-nav-link active">
                  Programs
                </Link>
                <Link to="/about" className="program-nav-link ">
                  About
                </Link>
                <Link to="/StudentProfile" className="program-nav-link">
                  Profile
                </Link>
                <button className="program-logout-btn" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </nav>

      <div className="program-hero-section" style={{ backgroundImage: "url('/pic3.jpg')" }}>
        <div className="program-hero-overlay">
          <div className="program-hero-content">
            <h1 className="program-hero-title">Discover Amazing Programs</h1>
            <p className="program-hero-subtitle">Explore upcoming events and past achievements</p>
            <div className="program-search-container">
              <Search className="search-icon" />
              <input
                type="text"
                className="program-search-input"
                placeholder="Search programs..."
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="main-container">
        {/* Upcoming Programs */}
        <section className="program-section">
          <h2 className="program-section-title">
            <Calendar className="section-icon" />
            UPCOMING PROGRAMS
          </h2>
          <div className="program-grid">
            {filteredPrograms.filter(p => !p.conducted).length > 0 ? (
              filteredPrograms.filter(p => !p.conducted).map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-card-content">
                    <h3 className="program-card-title">{program.title}</h3>
                    <div className="program-card-info">
                      <div className="info-item">
                        <Calendar className="info-icon" />
                        <span>{program.date}</span>
                      </div>
                      <div className="info-item">
                        <Clock className="info-icon" />
                        <span>{program.time}</span>
                      </div>
                      <div className="info-item">
                        <MapPin className="info-icon" />
                        <span>{program.venue}</span>
                      </div>
                      <div className="info-item">
                        <User className="info-icon" />
                        <span>{program.organizer}</span>
                      </div>
                    </div>
                    <button 
                      className="program-details-btn"
                      onClick={() => navigate(`/ProgramDetails/${program.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-programs-message">No upcoming programs found.</p>
            )}
          </div>
        </section>

        {/* Conducted Programs */}
        <section className="program-section conducted-section">
          <h2 className="program-section-title">
            <Calendar className="section-icon" />
            PAST PROGRAMS
          </h2>
          <div className="program-grid">
            {filteredPrograms.filter(p => p.conducted).length > 0 ? (
              filteredPrograms.filter(p => p.conducted).map((program) => (
                <div key={program.id} className="program-card conducted">
                  <div className="program-card-content">
                    <h3 className="program-card-title">{program.title}</h3>
                    <div className="program-card-info">
                      <div className="info-item">
                        <Calendar className="info-icon" />
                        <span>{program.date}</span>
                      </div>
                      <div className="info-item">
                        <Clock className="info-icon" />
                        <span>{program.time}</span>
                      </div>
                      <div className="info-item">
                        <MapPin className="info-icon" />
                        <span>{program.venue}</span>
                      </div>
                      <div className="info-item">
                        <User className="info-icon" />
                        <span>{program.organizer}</span>
                      </div>
                    </div>
                    <button 
                      className="program-details-btn"
                      onClick={() => navigate(`/ProgramDetails/${program.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-programs-message">No past programs found.</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Program;