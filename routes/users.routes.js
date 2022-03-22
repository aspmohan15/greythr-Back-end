const express = require('express')
const Router = express.Router()
const { signin, signup, getMe, deleteData, register } = require('../controllers/user.controllers')
const auth = require('../middleware/auth.middleware')

Router.post("/signin", signin)
Router.post("/signup", signup)
Router.post('/register', register)
Router.get("/me", auth, getMe)


Router.delete("/all", deleteData)
Router.get("/jwtcheck", auth)

// Router.get("/getallusersdata", getAllUserData)

module.exports = Router;



