import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(""); // For success/error messages
  const [profileImage, setProfileImage] = useState(null); // State to hold the profile image
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/profile/")
      .then((response) => {
        setUsername(response.data.username);
        setNewUsername(response.data.username);
        setProfileImage(response.data.profile_image); // Set the profile image from the response
        setImagePreview(response.data.profile_image); // Set the image preview (if any)
      })
      .catch((error) => {
        console.error("There was an error fetching the profile!", error);
        setStatus("error");
        setTimeout(() => navigate("/login"), 3000);
      });
  }, [navigate]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (!newUsername.trim()) {
      setStatus("error");
      return;
    }

    api
      .put("/api/profile/", { username: newUsername, profile_image: profileImage })
      .then((response) => {
        setUsername(newUsername);
        setEditing(false);
        setStatus("success");
        setTimeout(() => setStatus(""), 3000); // Clear status after 3 seconds
      })
      .catch((error) => {
        console.error("There was an error updating the profile!", error);
        setStatus("error");
      });
  };

  const handleCancel = () => {
    setNewUsername(username);
    setEditing(false);
    setStatus("");
  };

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  return (
    <div className="profile-container fade-in" style={{ marginTop: "200px" }}>
      <h1>{username ? `👋 Hey ${username}` : "Loading..."}</h1>

      {/* Profile Image Upload Section */}
      <div className="profile-image-upload">
        <label htmlFor="profileImage">
          <div className="image-preview">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="profile-image" />
            ) : (
              <span>No image selected</span>
            )}
          </div>
        </label>
        <input
          type="file"
          id="profileImage"
          className="input-file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Edit Profile Section */}
      {editing ? (
        <div className="edit-form">
          <input
            type="text"
            className="input-field"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            autoFocus
          />
          <button className="button button-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="button button-primary" onClick={handleEdit}>
          Edit Profile
        </button>
      )}

      {/* Success/Failure Messages */}
      {status === "success" && (
        <div className="success-message">Profile updated successfully!</div>
      )}
      {status === "error" && (
        <div className="error-message">There was an error updating your profile.</div>
      )}

      {/* Return to Home Button */}
      <div className="button-container">
        <button className="button button-secondary" onClick={handleReturnHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Profile;
