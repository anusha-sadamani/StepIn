import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import "./JoinedDetails.css";
import Footer from "./Footer";

const JoinedDetails = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { programId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    if (isNaN(programId) || programId === undefined || programId === null) {
      setError("Invalid program ID");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${programId}`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("There was an error fetching the users.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [programId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="nav-logo" />
          </Link>
        </div>
        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />Logout
          </button>
        </div>
      </nav>

      <div className="main-card">
        <div className="card-header">
          <h2 className="card-title">Program Participants</h2>
          <p className="program-id">
            Viewing participants for Program ID: <span className="program-id-value">{programId}</span>
          </p>
        </div>
        <div className="card-content">
          {error ? (
            <div className="error-alert">
              <p>{error}</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Batch</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="user-id-cell">{user.id}</td>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.batch}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="empty-message">
                        No participants found for this program
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default JoinedDetails;