import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User, LogOut, Info, CheckCircle, Activity, Users, Target, ArrowUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CouncilDashboard.css';
import Footer from "./Footer";

const CouncilDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProgram, setCurrentProgram] = useState({
    id: null,
    date: "",
    description: "",
    organizer: "",
    time: "",
    title: "",
    venue: "",
    conducted: false,
  });

  const [stats, setStats] = useState({
    totalPrograms: 0,
    conductedPrograms: 0,
    upcomingPrograms: 0,
    activeOrganizers: 0
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    const conducted = programs.filter(p => p.conducted).length;
    setStats({
      totalPrograms: programs.length,
      conductedPrograms: conducted,
      upcomingPrograms: programs.length - conducted,
      activeOrganizers: new Set(programs.map(p => p.organizer)).size
    });
  }, [programs]);

  const fetchPrograms = () => {
    axios
      .get("http://localhost:8080/api/programs")
      .then((response) => setPrograms(response.data))
      .catch((error) => console.error("Error fetching programs:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const programData = {
        title: currentProgram.title,
        description: currentProgram.description,
        date: currentProgram.date,
        time: currentProgram.time,
        venue: currentProgram.venue,
        organizer: currentProgram.organizer,
        conducted: false,
      };
  
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/programs/${currentProgram.id}`, programData);
      } else {
        await axios.post("http://localhost:8080/api/programs", programData);
      }
  
      fetchPrograms();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving program:", error);
      alert(error.response?.data?.message || "Failed to save program");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/programs/${id}`);
      setPrograms((prevPrograms) => prevPrograms.filter((program) => program.id !== id));
      alert("Program deleted successfully!");
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program");
    }
  };

  const handleConducted = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/programs/${id}/conducted`);
      setPrograms((prevPrograms) => prevPrograms.map(program =>
        program.id === id ? { ...program, conducted: true } : program
      ));
      alert("Program marked as conducted!");
    } catch (error) {
      console.error("Error updating program status:", error);
      alert("Failed to update program status");
    }
  };

  const openEditModal = (program) => {
    setCurrentProgram(program);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentProgram({
      id: null,
      date: "",
      description: "",
      organizer: "",
      time: "",
      title: "",
      venue: "",
      conducted: false,
    });
    setIsEditMode(false);
  };

  return (
    <div className="dashboard-container">
       <nav className="navbar">
              <div className="nav-left">
                <Link to="/" className="logo-link">
                  <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="nav-logo" />
                </Link>
              </div>
              <div className="nav-right">
                <Link to="/CouncilDashboard" className="nav-link active">Dashboard</Link>
                <Link to="/Councilprogram" className="nav-link "><Calendar className="w-4 h-4 mr-2" />Programs</Link>
                <Link to="/Guidelines" className="nav-link"><Info className="w-4 h-4 mr-2" />About</Link>
                <Link to="/CouncilProfile" className="nav-link"><User className="w-4 h-4 mr-2" />Profile</Link>
                <button className="logout-btn" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</button>
              </div>
            </nav>
      
        

      <main className="dashboard-main">
        <section className="welcome-section">
          <h1>Welcome to StepIn Dashboard</h1>
          <p>Manage and track all council activities, programs, and initiatives from one central location.</p>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Programs</h3>
              <Activity className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalPrograms}</div>
              <p className="stat-label">Across all categories</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Conducted Programs</h3>
              <CheckCircle className="stat-icon success" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.conductedPrograms}</div>
              <p className="stat-label">Successfully completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Upcoming Programs</h3>
              <Target className="stat-icon primary" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.upcomingPrograms}</div>
              <p className="stat-label">Scheduled for future</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Active Organizers</h3>
              <Users className="stat-icon secondary" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.activeOrganizers}</div>
              <p className="stat-label">Contributing members</p>
            </div>
          </div>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => { resetForm(); setIsModalOpen(true); }}>
              <Calendar className="action-icon" />
              <h3>Create New Program</h3>
              <p>Schedule and organize new council programs</p>
            </button>

            <Link to="/CouncilProfile" className="action-card">
              <User className="action-icon" />
              <h3>Update Profile</h3>
              <p>Manage your council profile and settings</p>
            </Link>

            <Link to="/Guidelines" className="action-card">
              <Info className="action-icon" />
              <h3>View Guidelines</h3>
              <p>Access council policies and procedures</p>
            </Link>
          </div>
        </section>

        <section className="recent-programs">
          <div className="section-header">
            <h2>Recent Programs</h2>
            <Link to="/Councilprogram" className="view-all">
              View all programs <ArrowUp className="arrow-icon" />
            </Link>
          </div>
          
          <div className="programs-grid">
            {programs.slice(0, 6).map((program) => (
              <div key={program.id} className={`program-card ${program.conducted ? 'conducted' : ''}`}>
                <div className="program-card-header">
                  <h3>{program.title}</h3>
                  {program.conducted && (
                    <span className="status-badge">Completed</span>
                  )}
                </div>
                <div className="program-card-content">
                  <div className="program-info">
                    <Calendar className="info-icon" />
                    <span>{program.date}</span>
                  </div>
                  <div className="program-info">
                    <Clock className="info-icon" />
                    <span>{program.time}</span>
                  </div>
                  <div className="program-info">
                    <MapPin className="info-icon" />
                    <span>{program.venue}</span>
                  </div>
                  <div className="program-info">
                    <User className="info-icon" />
                    <span>{program.organizer}</span>
                  </div>
                  <p className="program-description">{program.description}</p>
                </div>
                <div className="program-card-actions">
                  <button className="edit-btn" onClick={() => openEditModal(program)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(program.id)}>Delete</button>
                  {!program.conducted && (
                    <button
                      className="conduct-btn"
                      onClick={() => handleConducted(program.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2>{isEditMode ? "Edit Program" : "Create New Program"}</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                {["title", "description", "date", "time", "venue", "organizer"].map((field) => (
                  <div key={field} className="form-group">
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    <input
                      type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                      name={field}
                      value={currentProgram[field]}
                      onChange={handleInputChange}
                      required={["title", "date", "time", "venue", "organizer"].includes(field)}
                      className="form-input"
                    />
                  </div>
                ))}
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">
                    {isEditMode ? "Update " : "Create "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer/>
    </div>
  );
};

export default CouncilDashboard;