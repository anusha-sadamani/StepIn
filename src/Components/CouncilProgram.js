import React, { useEffect, useState } from "react";
import { Calendar, User, LogOut, Info, Search } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import './CouncilProgram.css';
import Footer from "./Footer";

const CouncilProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/programs");
        const data = await response.json();
        setPrograms(Array.isArray(data) ? data : []);
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

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  const heroStyle = {
    background: `url('/pic3.jpg') no-repeat center center fixed`,
    backgroundSize: 'cover'
  };

  if (error) {
    return (
      <div className="council-program">
        <div className="error-container">
          <div className="error-message">
            <h4>Error</h4>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="council-program">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="nav-logo" />
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/CouncilDashboard" className="nav-link">Dashboard</Link>
          <Link to="/Councilprogram" className="nav-link active"><Calendar className="w-4 h-4 mr-2" />Programs</Link>
          <Link to="/Guidelines" className="nav-link"><Info className="w-4 h-4 mr-2" />About</Link>
          <Link to="/CouncilProfile" className="nav-link"><User className="w-4 h-4 mr-2" />Profile</Link>
          <button className="logout-btn" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section" style={heroStyle}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Discover Amazing Programs</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="programs-grid">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-card-header">
                  <h3 className="program-title">{program.title}</h3>
                </div>
                <div className="program-card-content">
                  <div className="program-content">
                    <div className="program-description">
                      <p className="field-label">Description</p>
                      <p className="field-value">{program.description}</p>
                    </div>
                    <div className="program-details">
                      <div className="detail-item">
                        <p className="field-label">Date</p>
                        <p className="field-value">{program.date}</p>
                      </div>
                      <div className="detail-item">
                        <p className="field-label">Time</p>
                        <p className="field-value">{program.time}</p>
                      </div>
                      <div className="detail-item">
                        <p className="field-label">Venue</p>
                        <p className="field-value">{program.venue}</p>
                      </div>
                      <div className="detail-item">
                        <p className="field-label">Organizer</p>
                        <p className="field-value">{program.organizer}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/JoinedDetails/${program.id}`)}
                      className="details-button"
                    >
                      View Student Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-programs">
              <p>No programs found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CouncilProgram;