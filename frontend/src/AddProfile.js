import React from "react";

const AddProfile = (props) => {
  const { form, updateProfile, addToList } = props;
  return (
    <div>
      <div className="profile-form">
        <label>Student Name</label>
        <br />
        <input
          placeholder="Enter student name"
          value={form.name}
          onChange={(e) => {
            updateProfile("name", e);
          }}
        />
        <br />
        <label>House</label>
        <br />
        <input
          placeholder="Enter House"
          value={form.house}
          onChange={(e) => {
            updateProfile("house", e);
          }}
        />
        <br />
        <label>BloodLine</label>
        <br />
        <input
          placeholder="Enter Bloodline"
          value={form.bloodline}
          onChange={(e) => {
            updateProfile("bloodline", e);
          }}
        />
        <br />

        <button onClick={addToList}>Add To List</button>
      </div>
    </div>
  );
};

export default AddProfile;
