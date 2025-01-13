import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import "../stylestwo/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null); // Track the id of the user being edited
  const [editedUsername, setEditedUsername] = useState(""); // Store the new username
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users based on the search query

  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/admin/users/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { search: searchQuery }, // Include search query in the request
        });
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially, show all users
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [searchQuery]); // Re-fetch users whenever the searchQuery changes

  // Handle username update for a specific user
  const handleEditSubmit = async (e, userId) => {
    e.preventDefault();
    if (!editedUsername) {
      setError("Username cannot be empty.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.patch(
        `http://127.0.0.1:8000/admin/users/${userId}/edit/`,
        { username: editedUsername },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, username: editedUsername } : user
          )
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === userId ? { ...user, username: editedUsername } : user
          )
        );
        setEditingUserId(null); // Reset editing state
        setEditedUsername(""); // Clear the edited username input
      }
    } catch (err) {
      setError("Failed to update username.");
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.delete(
        `http://127.0.0.1:8000/admin/users/${userId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token from localStorage
    navigate("/admin/login/"); // Use navigate for redirection to login page
  };

  return (
    <div style={styles.container}>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </button>
  
      <h1 style={styles.header}>Admin Dashboard</h1>
      {error && <p style={styles.error}>{error}</p>}
  
      {/* Search input */}
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by username or email"
          style={styles.input}
          onFocus={(e) => e.target.style.border = styles.inputFocus.border}
          onBlur={(e) => e.target.style.border = '1px solid #ccc'}
        />
        <button
          style={styles.button}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Search
        </button>
      </div>
  
      <ul style={styles.list}>
        {filteredUsers.length === 0 ? (
          <p style={styles.noUsers}>No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <li key={user.id} style={styles.listItem}>
              {editingUserId === user.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, user.id)} style={{ display: 'flex', width: '100%' }}>
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    required
                    style={{ ...styles.input, flex: 1 }}
                  />
                  <button type="submit" style={styles.button}>
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingUserId(null)}
                    style={styles.cancelButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span style={styles.listItemText}>{user.username} - {user.email}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingUserId(user.id);
                        setEditedUsername(user.username);
                      }}
                      style={styles.button}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={styles.cancelButton}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
  
};

// Styles object
const styles = {
  container: {
    position: 'relative', // Required for positioning child elements
    padding: '40px',
    backgroundColor: '#f7f7f7',
    borderRadius: '12px',
    width: '90%',
    margin: 'auto',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    minHeight: '100vh',
    maxWidth: '1400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  header: {
    textAlign: 'center',
    color: '#2C3E50',
    fontSize: '36px',
    marginBottom: '40px',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
    width: '100%',
  },
  input: {
    padding: '14px 18px',
    marginRight: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '280px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    border: '1px solid #3498db',
    boxShadow: '0 0 5px rgba(52, 152, 219, 0.6)',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 10px rgba(52, 152, 219, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  cancelButton: {
    padding: '12px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px',
  },
  cancelButtonHover: {
    backgroundColor: '#c0392b',
  },
  logoutButton: {
    position: 'absolute', // Place the button at the top-right corner
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    backgroundColor: '#ef4c29',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    zIndex: 10, // Ensure it stays above other elements
  },
  
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  listItemText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  noUsers: {
    color: '#888',
    fontSize: '18px',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
};

export default AdminDashboard;
