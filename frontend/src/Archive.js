
import React, { useState, useEffect } from "react";
import "./styles/Details.css";

const Archive = ({ profile }) => {
  const [error, setError] = useState(null);
  const [isArchived, setIsArchived] = useState(profile ? profile.isArchived : false); // Check if profile is defined before accessing isArchived

  const handleArchiveToggle = async () => {
    try {
      const response = await fetch(`/api/profiles/${profiles._id}/archive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIsArchived(!isArchived);
      console.log(data.message);
    } catch (error) {
      console.error('Error archiving/unarchiving profile:', error);
      setError('Error archiving/unarchiving profile');
    }
  };

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("api/profiles");
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const json = await response.json();
        setProfiles(json);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError('Error fetching profiles');
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="profile-details">
      {profiles.map((profile) => (
        <div className="stud-profile" key={profile._id}>
                  {!isArchived && (
                    <>
          <button onClick={handleArchiveToggle}>
            {isArchived ? 'Unarchive' : 'Archive'}
          </button>
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
      {!profile ? (
        <p>No profile found</p>
      ) : (
        <>
          <div className="arch-btn">
            <button onClick={handleArchiveToggle}>
              {isArchived ? 'Unarchive' : 'Archive'}
            </button>
          </div>
          <h5>{profile.name}</h5>
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
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Archive;
