import React, { useState, useEffect } from "react";
import ProfileDetails from "./components/ProfileDetails";

const Archive = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchivedProfiles = async () => {
      try {
        const response = await fetch(`/api/profiles`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching archived profiles:', error);
        setError('Error fetching archived profiles');
      }
    };

    fetchArchivedProfiles();
  }, []);
  return (
  <div className="content">
    <h1>Archived Profiles</h1>
      {profiles.map((profiles) => (
        <ProfileDetails key={profiles._id} profile={profiles} />
      ))}
      {error && <div className="error">{error}</div>}
  </div>
  )
};

export default Archive;
