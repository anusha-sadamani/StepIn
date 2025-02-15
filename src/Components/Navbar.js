import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { LogOut, X, Menu } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className={`stepin-navbar ${isNavScrolled ? 'stepin-navbar--scrolled' : ''}`}>
      <div className="stepin-navbar__content">
        <div className="stepin-navbar__inner">
          <div className="stepin-navbar__logo-container">
            <Link to="/">
              <img src="/logo.png" alt="StepIn Logo" className="stepin-navbar__logo" />
            </Link>
          </div>
          <div className="stepin-navbar__desktop-nav">
            <Link to="/dashboard" className="stepin-navbar__nav-link stepin-navbar__nav-link--active">
              Dashboard
            </Link>
            <Link to="/program" className="stepin-navbar__nav-link">
              Programs
            </Link>
            <Link to="/about" className="stepin-navbar__nav-link">
              About
            </Link>
            <Link to="/StudentProfile" className="stepin-navbar__nav-link">
              Profile
            </Link>
            <button className="stepin-navbar__logout-btn" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          <button
            className="stepin-navbar__mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="stepin-navbar__mobile-menu stepin-navbar__mobile-menu--open">
            <Link to="/dashboard" className="stepin-navbar__mobile-menu-item">
              Dashboard
            </Link>
            <Link to="/program" className="stepin-navbar__mobile-menu-item">
              Programs
            </Link>
            <Link to="/about" className="stepin-navbar__mobile-menu-item">
              About
            </Link>
            <Link to="/StudentProfile" className="stepin-navbar__mobile-menu-item">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="stepin-navbar__mobile-menu-item stepin-navbar__logout-btn"
              style={{ width: '100%', textAlign: 'left' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;