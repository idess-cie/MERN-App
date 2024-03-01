const express = require('express')

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
router.post('/', (req, res) => {
    res.json({mssg: 'Add new profile'})
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