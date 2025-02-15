import React from "react";
import { Link ,useNavigate } from "react-router-dom";
import "./CouncilAbout.css";
import Footer from "./Footer";

const CouncilAbout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };
  return (
   <div className="dashboard-layout">
         {/* Navigation Bar */}
         <nav className="navbar">
           <div className="nav-left">
             <Link to="/" className="logo-link">
               <img src="/logo.png" alt="StepIn Logo" className="nav-logo" />
             </Link>
           </div>
           <div className="nav-right">
             <Link to="/CouncilDashboard" className="nav-link ">Dashboard</Link>
             <Link to="/CouncilProgram" className="nav-link ">Programs</Link>
             <Link to="/CouncilAbout" className="nav-link active">About</Link>
             <Link to="/CouncilProfile" className="nav-link">Profile</Link>
             <button className="logout-btn" onClick={handleLogout}>
               Logout
             </button>
           </div>
         </nav>

      {/* Main Content */}
      <div className="content" style={{
        background: `url('/pic.jpg') no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}>
        <div className="content-box fixed-box">
          <h2>About StepIn</h2>
          <p>
            StepIn is a web-based voluntary application designed to bridge communication
            and collaboration between students and council members. The platform empowers
            students to stay updated on the latest programs and events organized by their
            councils, while providing council members with tools to effectively announce
            and manage these programs.
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

export default CouncilAbout;