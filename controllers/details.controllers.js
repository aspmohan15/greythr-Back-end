
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersInformation = require('../model/info.model')
const { Op } = require('sequelize')

// @desc   Register new user
// @route  POST /api/users
// @access Public
const signup = async (req, res) => {
    const data = await Users.findAll({
        where: {
            employees_id: {
                [Op.and]: [1, 10]
            }
        }
    })
    res.send(data)
}


// @desc   Authenticate new user
// @route  POST /api/users/login
// @access Public
const signin = async (req, res) => {
    try {
        await Users.create({
            employees_id: 100,
            name: "mohan",
            location: "erode",
            contact: 123456,
            email: "mohan@gmail.com"

        })
        res.send("ok")
    } catch (err) {
        console.log("errhommm");
        res.send(err)
    }
}

// @desc   GET user data
// @route  POST /api/users/me
// @access Private
const getMe = (req, res) => {
    res.send("from getme")
}
module.exports = { signin, signup, getMe };

