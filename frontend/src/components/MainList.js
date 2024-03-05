// MainList.js
import React from "react";
import ProfileDetails from "./ProfileDetails";

const MainList = ({ profiles, handleArchiveToggle }) => {
  // Filter out archived profiles from the main list
  const activeProfiles = profiles.filter(profile => !profile.isArchived);

  return (
    <div>
      <h2>Main List</h2>
      {activeProfiles.map(profile => (
        <ProfileDetails
          key={profile._id}
          profile={profile}
          handleArchiveToggle={handleArchiveToggle}
        />
      ))}
    </div>
  );
};

export default MainList;
