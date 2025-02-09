import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook

const JoinedDetails = () => {
  // State to hold the list of users and error message
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const { programId } = useParams(); // Extract programId from the URL

  useEffect(() => {
    // Check if programId is valid
    if (isNaN(programId) || programId === undefined || programId === null) {
      setError("Invalid program ID");
      return; // Exit if the programId is invalid
    }

    // Fetch users based on programId
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${programId}`);
        setUsers(response.data); // Set the users state with the response data
      } catch (err) {
        setError("There was an error fetching the users.");
        console.error(err); // Log the error for debugging
      }
    };

    fetchUsers();
  }, [programId]); // The effect will run when the programId changes

  return (
    <div>
      <h2>Users Who Joined the Program</h2>

      {/* Show error message if there is one */}
      {error && <p>{error}</p>}

      {/* Show list of users */}
      <table>
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
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.batch}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found for this program</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JoinedDetails;
