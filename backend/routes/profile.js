const express = require("express");
const Profile = require("../models/ProfileModel");
const {
  addProfile,
  getProfile,
  getProfiles,
  deleteProfile,
  updateProfile,
  archiveProfile,
} = require("../controllers/profilecontrollers");

const router = express.Router();

// GET profile
router.get("/", getProfiles);

// GET single profile
router.get("/:id", getProfile);

// Add new Profile
router.post("/", addProfile);

// DELETE Profile
router.delete("/:id", deleteProfile);

// UPDATE Profile
router.patch("/:id", updateProfile);

// ARCHIVE Profile
router.put('/:id/archive', archiveProfile);

module.exports = router;
