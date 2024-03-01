require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");

const profileRoutes = require('./routes/profile')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route
app.use('/api/profiles', profileRoutes)

// DB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen req
        app.listen(process.env.PORT, () => {
            console.log('connected to DB and listening in port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

