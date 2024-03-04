import React from 'react'
import "../styles/Details.css"

const ProfileDetails = ({ profiles }) => {
  return (
    <div className='profile-details'>
        <h5>{profiles.name}</h5>
        <ul>
            <li><strong>House: </strong>{profiles.house}</li>
            <li><strong>BloodLine: </strong>{profiles.bloodline}</li>
        </ul>
        <p>{profiles.createdAt}</p>
    </div>
  )
}

export default ProfileDetails