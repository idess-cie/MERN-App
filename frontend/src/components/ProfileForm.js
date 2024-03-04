import React, { useState } from "react";
import "../styles/ProfileForm.css";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");
  const [bloodline, setBloodline] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const profile = {name, house, bloodline}

    const response = await fetch('/api/profiles',{
        method: 'POST',
        body: JSON.stringify(profile),
        headers:{
        'Content-Type': 'application/json'
        } 
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    } 
    if (response.ok) {
        setName('')
        setHouse('')
        setBloodline('')
        setError(null)
        console.log('New Student Added', json)
    }
  }

  return (
    <form className="addnew" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        placeholder="Enter Student Name..."
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>House</label>
      <input
        placeholder="Enter House..."
        type="text"
        onChange={(e) => setHouse(e.target.value)}
        value={house}
      />
      <label>Bloodline</label>
      <input
        placeholder="Enter Bloodline..."
        type="text"
        onChange={(e) => setBloodline(e.target.value)}
        value={bloodline}
      />

      <button>Add Student</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
