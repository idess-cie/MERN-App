import React, { useState, useEffect } from "react";
import "./styles/Details.css";

const Archive = ({ profile }) => {
  const [error, setError] = useState(null);
  const [isArchived, setIsArchived] = useState(
    profile ? profile.isArchived : false
  ); 

  const handleArchiveToggle = async ({profiles}) => {
    try {

      const response = await fetch(`/api/profiles/archive/${profiles._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to toggle archive status: ${errorMessage}`);
      }

      setIsArchived(!isArchived);
      console.log("Archive status toggled successfully");
    } catch (error) {
      console.error("Error archiving/unarchiving profile:", error);
      setError("Error archiving/unarchiving profile");
    }
  };


  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("api/profiles");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const json = await response.json();
        setProfiles(json);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Error fetching profiles");
      }
    };

    fetchProfiles();
  }, []);

  const handleClick = async (profile) => {
    try {
      const response = await fetch(`/api/profiles/${profile._id}`, {
        method: "DELETE",
        headers:{
          "Content-Type":"application/json"
      },  
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
  
      console.log("Profile deleted successfully");
    } catch (error) {
      console.error("Error deleting profile:", error);
      setError("Error deleting profile");
    }
  };

  return (
    <div className="profile-details">
      {profiles &&
        profiles.map((profile) => (
          <div className="stud-profile" key={profile._id}>
            {!isArchived && (
              <>
                <button onClick={handleArchiveToggle}>
                  {isArchived ? "Archive" : "Unarchive"}
                </button>
                <button onClick={() => handleClick(profile)}>Delete</button>
                <p>{profile.name}</p>
                <ul>
                  <li>
                    <strong>House: </strong>
                    {profile.house}
                  </li>
                  <li>
                    <strong>BloodLine: </strong>
                    {profile.bloodline}
                  </li>
                </ul>
                <p>{profile.createdAt}</p>
              </>
            )}
          </div>
        ))}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Archive;
