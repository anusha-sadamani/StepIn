import React from 'react';
import Footer from './Footer';
import "./Guidelines.css";
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, LogOut, Info,  } from 'lucide-react';


const Guidelines = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <div className="dashboard-guide">
            <nav className="navbar">
                <div className="nav-left">
                    <Link to="/" className="logo-link">
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="nav-logo" />
                    </Link>
                </div>
                <div className="nav-right">
                <Link to="/CouncilDashboard" className="nav-link active">Dashboard</Link>
                <Link to="/Councilprogram" className="nav-link "><Calendar className="w-4 h-4 mr-2" />Programs</Link>
                <Link to="/Guildelines" className="nav-link"><Info className="w-4 h-4 mr-2" />About</Link>
                <Link to="/CouncilProfile" className="nav-link"><User className="w-4 h-4 mr-2" />Profile</Link>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />Logout
                    </button>
                </div>
            </nav>

            <div className="guidelines-container">
                <h1>Council Member Guidelines</h1>
                <p>As a council member, you are expected to follow these guidelines to ensure smooth operation and effective communication within the platform.</p>

                <div className="guidelines-section">
                    <h2>1. Program Announcement</h2>
                    <ul>
                        <li>Ensure all program details (title, description, date, time, venue) are accurate before announcing.</li>
                        <li>Provide clear and concise descriptions to avoid confusion.</li>
                        <li>Announce programs at least one week in advance to give students enough time to join.</li>
                    </ul>
                </div>

                <div className="guidelines-section">
                    <h2>2. Managing Programs</h2>
                    <ul>
                        <li>Regularly update program details if there are any changes.</li>
                        <li>Delete outdated or canceled programs to keep the list clean.</li>
                        <li>Monitor the number of participants and ensure the program capacity is not exceeded.</li>
                    </ul>
                </div>

                <div className="guidelines-section">
                    <h2>3. Communication with Participants</h2>
                    <ul>
                        <li>Send timely reminders and updates to participants.</li>
                        <li>Be polite and professional in all communications.</li>
                        <li>Address any concerns or questions from participants promptly.</li>
                    </ul>
                </div>

                <div className="guidelines-section">
                    <h2>4. General Conduct</h2>
                    <ul>
                        <li>Maintain professionalism at all times.</li>
                        <li>Respect the privacy and confidentiality of student information.</li>
                        <li>Report any technical issues or misuse of the platform to the admin.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Guidelines;