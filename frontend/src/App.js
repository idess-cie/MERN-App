import React, { useEffect, useState } from "react";
import "./styles/App.css";

import ProfileDetails from "./components/ProfileDetails";
import ProfileForm from "./components/ProfileForm";

function App() {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("api/profiles");
      const json = await response.json();

      if (response.ok) {
        setProfiles(json);
      }
    };

    fetchProfile();
  });

  return (
    <div className="App">
      <h1>Hogwarts Student Profile</h1>
      <div className="content">
        <div className="student-card">
            <h3>Student Profile</h3>
          {profiles &&
            profiles.map((profiles) => (
              <div className="stud-profile" key={profiles._id}>
                <ProfileDetails key={profiles._id} profiles={profiles} />
              </div>
            ))}
        </div>
        <div className="forms">
          <h3>Profile Forms</h3>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}

export default App;
