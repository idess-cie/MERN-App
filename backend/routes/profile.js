const express = require('express')
const Profile = require("../models/ProfileModel")

const router = express.Router()

// GET profile
router.get('/', (req, res) => {
    res.json({mssg: 'GET all profile'})
})

// GET single profile
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single profile'})
})

// Add new Profile
router.post('/', async (req, res) => {
    const {name, house, bloodline} = req.body

    try{
        const profile = await Profile.create({name, house, bloodline})
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE Profile
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE profile'})
})

// UPDATE Profile
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE profile'})
})


module.exports = router