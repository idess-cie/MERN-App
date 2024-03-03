import React from "react";

const AddProfile = (props) => {
    const {
        editID,
        form,
        updateForm,
        addToList,   
        editBooks,                    
    } = props  
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
        />{" "}
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
        <label>BloodLine</label>
        <input
          placeholder="Enter Bloodline"
          value={form.bloodline}
          onChange={(e) => {
            updateProfile("bloodline", e);
          }}
        />
        <br />
        {
                editID?
                <button onClick={editBooks}>
                    Edit Book
                </button>
                :
                <button onClick={addToList}>
                    Add To List
                </button>
            }
      </div>
    </div>
  );
};

export default AddProfile;
