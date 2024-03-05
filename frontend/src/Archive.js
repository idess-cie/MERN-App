import React from 'react'

const Archive = () => {
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
  </div>
  )
}

export default Archive