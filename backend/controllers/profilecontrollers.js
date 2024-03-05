const Profile = require("../models/ProfileModel");
const mongoose = require("mongoose");

// Get All
const getProfiles = async (req, res) => {
  const profiles = await Profile.find({}).sort({ createdAt: -1 });

  res.status(200).json(profiles);
};

// Get Single
const getProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Profile Exist" });
  }

  const profile = await Profile.findById(id);
  if (!profile) {
    return res.status(404).json({ error: "No Profile" });
  }
  res.status(200).json(profile);
};

// Add
const addProfile = async (req, res) => {
  const { name, house, bloodline } = req.body;

  // Add to db
  try {
    const profile = await Profile.create({ name, house, bloodline });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Profile" });
  }

  const profile = await Profile.findOneAndDelete({ _id: id });

  if (!profile) {
    return res.status(404).json({ error: "No Profile" });
  }
  res.status(200).json(profile);
};

// Update
const updateProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No  Such Profile" });
  }

  const profile = await Profile.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!profile) {
    return res.status(404).json({ error: "No Profile" });
  }
  res.status(200).json(profile);
};

const archiveProfile = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No  Such Profile" });
    }

    try {
        const profile = await Profile.findById(id);

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        // Toggle the isArchived field
        profile.isArchived = !profile.isArchived;
        await profile.save();

        if (profile.isArchived) {
            res.json({ message: 'Profile archived successfully', profile });
        } else {
            res.json({ message: 'Profile unarchived successfully', profile });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
  updateProfile,
  deleteProfile,
  getProfiles,
  addProfile,
  getProfile,
  archiveProfile,
};
