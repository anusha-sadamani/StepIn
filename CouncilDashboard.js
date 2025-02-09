import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, MapPin, User, LogOut, Info, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  // Fetch all programs on component mount
  useEffect(() => {
    fetchPrograms();
  }, []);

  // Fetch programs from backend
  const fetchPrograms = () => {
    axios
      .get("http://localhost:8080/api/programs")
      .then((response) => setPrograms(response.data))
      .catch((error) => console.error("Error fetching programs:", error));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create or update a program
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
        conducted: false, // Ensure it is explicitly set
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
  

  // Delete a program
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

  // Mark a program as conducted
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

  // Open edit modal
  const openEditModal = (program) => {
    setCurrentProgram(program);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Reset form
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
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="nav-logo" />
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/CouncilDashboard" className="nav-link active">Dashboard</Link>
          <Link to="/Councilprogram" className="nav-link"><Calendar className="w-4 h-4 mr-2" />Programs</Link>
          <Link to="/Councilabout" className="nav-link"><Info className="w-4 h-4 mr-2" />About</Link>
          <Link to="/CouncilProfile" className="nav-link"><User className="w-4 h-4 mr-2" />Profile</Link>
          <button className="logout-btn" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</button>
        </div>
      </nav>

      <div className="content"
      style={{
        background: `url('/pic3.jpg') no-repeat center center fixed`,
        backgroundSize: "cover",
      }}>
        <div className="main-header">
          <h1>Council Dashboard</h1>
          <button
            className="create-program-btn"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Create New Program
          </button>
        </div>

        <div className="program-cards">
          {programs.map((program) => (
            <div key={program.id} className={`program-card ${program.conducted ? 'conducted' : ''}`}>
              <div className="program-card-header">
                <h3>{program.title}</h3>
                {program.conducted && <CheckCircle className="conducted-icon" />}
              </div>
              <div className="program-card-body">
                <div className="info"><Calendar className="w-4 h-4" /><span>{program.date}</span></div>
                <div className="info"><Clock className="w-4 h-4" /><span>{program.time}</span></div>
                <div className="info"><MapPin className="w-4 h-4" /><span>{program.venue}</span></div>
                <div className="info"><User className="w-4 h-4" /><span>{program.organizer}</span></div>
                <p>{program.description}</p>
              </div>
              <div className="program-card-footer">
                <button onClick={() => openEditModal(program)}>Edit</button>
                <button onClick={() => handleDelete(program.id)}>Delete</button>
                <button
                  className={`conducted-btn ${program.conducted ? 'conducted' : ''}`}
                  onClick={() => handleConducted(program.id)}
                  disabled={program.conducted}
                >
                  {program.conducted ? 'Conducted' : 'Mark as Conducted'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2>{isEditMode ? "Edit Program" : "Create New Program"}</h2>
                <button onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                {["title", "description", "date", "time", "venue", "organizer"].map((field) => (
                  <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    <input
                      type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                      name={field}
                      value={currentProgram[field]}
                      onChange={handleInputChange}
                      required={["title", "date", "time", "venue", "organizer"].includes(field)}
                    />
                  </div>
                ))}
                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">{isEditMode ? "Update Program" : "Create Program"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default CouncilDashboard;
