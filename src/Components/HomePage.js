import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="stepin-home">
      <div className="home-container">
        <nav className="home-nav">
          <div className="nav-brand">
            <img src="/logo.png" alt="StepIn Logo" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="/login" className="nav-btn login">Login</a>
            <a href="/signup" className="nav-btn signup">Sign Up</a>
          </div>
        </nav>

        <main className="hero-section">
          {/* Video Background */}
          <div className="video-background">
            <video autoPlay muted loop playsInline className="background-video">
            <source src="/marianvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay to ensure text readability */}
            <div className="video-overlay"></div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">Welcome to StepIn</h1>
            <p className="hero-subtitle">
              Connect, Collaborate, and Stay Updated with  Council Programs
            </p>
            <div className="cta-buttons">
              <a href="/signup" className="cta-btn primary">Get Started</a>
              <a href="/about" className="cta-btn secondary">Learn More</a>
            </div>
          </div>
        </main>

        <footer className="home-footer">
          <p>Copyright © 2024 All Rights Reserved | Marian College Kuttikkanam Autonomous | Privacy Policy | Terms & Conditions
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;