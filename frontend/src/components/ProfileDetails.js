import React, { useState } from "react";
import "../styles/Details.css";

const ProfileDetails = ({ profiles }) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    name: profiles.name,
    house: profiles.house,
    bloodline: profiles.bloodline
  });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track if form is open

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/profiles/${profiles._id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedProfile),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setError(null);
      setIsEditing(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true); // Open the form when edit button is clicked
  };

  return (
    <div className="profile-details">
      <h5>{profiles.name}</h5>
      <ul>
        <li>
          <strong>House: </strong>
          {profiles.house}
        </li>
        <li>
          <strong>BloodLine: </strong>
          {profiles.bloodline}
        </li>
      </ul>
      <p>{profiles.createdAt}</p>

      {isEditing && (
          <div className="updateForms">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="New Name"
              onChange={handleChange}
            />
            <label>House</label>
            <input
              type="text"
              name="house"
              placeholder="New House"
              onChange={handleChange}
            />
            <label>BloodLine</label>
            <input
              type="text"
              name="bloodline"
              placeholder="New Bloodline"
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Update Profile</button>
            {error && <div className="error">{error}</div>}
          </div>
        )}
        {!isEditing && (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
    </div>
  );
};

export default ProfileDetails;
