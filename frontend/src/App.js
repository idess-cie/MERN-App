import React, { useEffect, useState } from "react";
import "./styles/App.css";

import ProfileDetails from "./components/ProfileDetails";
import ProfileForm from "./components/ProfileForm";
import Archive from "./Archive";

function App() {
  const [page_tab, setTabs] = useState(0);
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
  }, []);

  function displayProfileList() {
    return (
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
    );
  }

  return (
    <div className="App">
      <h1>Hogwarts Student Profile</h1>
      <div className="tabs">
        <div className="btns">
          <button
            className="button"
            onClick={() => {
              setTabs(0);
            }}
          >
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Student List</span>
            </span>
          </button>

          <button
            className="button"
            onClick={() => {
              setTabs(1);
            }}
          >
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Archive</span>
            </span>
          </button>
        </div>
        {page_tab === 0 ? displayProfileList() : null}
        {page_tab === 1 ? <Archive /> : null}
      </div>
    </div>
  );
}

export default App;
