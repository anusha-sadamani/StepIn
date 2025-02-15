import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import './ProgramDetails.css'; // Import the combined CSS file
import { LogOut } from 'lucide-react';
import Footer from "./Footer";

const ProgramDetails = () => {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/programs/${programId}`);
        if (!response.ok) throw new Error('Failed to fetch program details');
        const data = await response.json();
        setProgram(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  const handleJoin = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      setError('Please log in to join the program');
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/programs/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, programId })
      });

      if (!response.ok) throw new Error('Failed to join program');
      const result = await response.text();
      if (result === "Already joined this program" || result === "Program has already been conducted") {
        setError(result);
      } else {
        setJoined(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="program-details-loading-container"><div className="program-details-loader"></div>Loading program details...</div>;
  if (error) return <div className="program-details-error-container"><div className="program-details-error-message">{error}</div></div>;
  if (!program) return <div className="program-details-no-program-container">No program found</div>;

  const heroStyle = {
    background: `url('/pic3.jpg') no-repeat center center fixed`,
    backgroundSize: 'cover'
  };

  return (
    <div className="program-details-layout">
      {/* Navigation Bar */}
      <nav className="program-details-navbar">
        <div className="program-details-nav-left">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="StepIn Logo" className="program-details-nav-logo" />
          </Link>
        </div>
        <div className="program-details-nav-right">
          <Link to="/StudentDashboard" className="program-details-nav-link active">Dashboard</Link>
          <Link to="/program" className="program-details-nav-link">Programs</Link>
          <Link to="/about" className="program-details-nav-link">About</Link>
          <Link to="/StudentProfile" className="program-details-nav-link">Profile</Link>
          <button className="program-details-logout-btn" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </nav>
      
      <main className="program-details-main-content">
        <div className="program-details-hero" style={heroStyle}></div>
        
        <div className="program-details-content-wrapper">
          <div className="program-details-card">
            <h1 className="program-details-title">{program.title}</h1>

            <div className="program-details-description">
              <p>{program.description}</p>
            </div>

            <div className="program-details-grid">
              <div className="program-details-info-item">
                <span className="program-details-info-label">Date</span>
                <span className="program-details-info-value">{program.date}</span>
              </div>
              <div className="program-details-info-item">
                <span className="program-details-info-label">Time</span>
                <span className="program-details-info-value">{program.time}</span>
              </div>
              <div className="program-details-info-item">
                <span className="program-details-info-label">Venue</span>
                <span className="program-details-info-value">{program.venue}</span>
              </div>
              <div className="program-details-info-item">
                <span className="program-details-info-label">Organizer</span>
                <span className="program-details-info-value">{program.organizer}</span>
              </div>
            </div>

            {program.additionalDetails && (
              <div className="program-details-additional-info">
                <h3 className="program-details-info-title">Additional Information</h3>
                <p>{program.additionalDetails}</p>
              </div>
            )}

            <div className="program-details-action-buttons">
              {joined ? (
                <div className="program-details-success-message">
                  <span className="program-details-checkmark">✓</span>
                  You have successfully joined this program!
                </div>
              ) : (
                <>
                  {program.conducted ? (
                    <div className="program-details-error-message">
                      This program has already been conducted.
                    </div>
                  ) : (
                    <button className="program-details-join-button" onClick={handleJoin}>
                      Join Program
                    </button>
                  )}
                  <button className="program-details-back-button" onClick={() => navigate('/StudentDashboard')}>
                    Back to Programs
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramDetails;