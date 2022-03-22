
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../model/users.model')
const EmplyeeInformation = require('../model/info.model')
const uuidv4 = require('uuid')




// @desc   Authenticate new user
// @route  POST /api/users/login
// @access Public
const signin = async (req, res) => {
    const { email, password } = req.body;
    // const email = 'mohan'
    // const password = 'erode';
    // const email = 'mohppan'
    try {

        //check existing User
        const existingUser = await Users.findOne({ where: { email: `${email}` } })
        if (!existingUser) return res.status(404).json({ message: "User does not Exist" })
        console.log(password, existingUser.password);
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password.toString())

        //check existing password
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

        //token 
        const token = jwt.sign({ email: existingUser.email, user_id: existingUser.user_id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.status(200).json({ currentUser: existingUser, token })
    } catch (err) {
        res.status(500).json({ message: "some thing Went Wrong" })
    }
}


// @desc   Register new user
// @route  POST /api/users
// @access Public
const signup = async (req, res) => {
    const { firstName, lastName, email, password, confrimPassword } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send("Please Enter All fields")
    }

    try {
        const existingUser = await Users.findOne({ where: { email: `${email}` } })
        if (existingUser) return res.status(400).json({ message: "User Already Exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await Users.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            user_id: uuidv4.v4()
        })
        const token = jwt.sign({ email: result.email, user_id: result.user_id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.status(200).json({ result, token })
    } catch (err) {
        res.status(500).json({ message: "some thing Went Wrong" })
    }
}

const deleteData = async (req, res) => {
    const deleted = await EmplyeeInformation.destroy({ where: { name: '8900' } })
    res.status(200).json(deleted)
}


// @desc   Register User Details
// @route  POST /api/users/register
// @access already user not permited

const register = async (req, res) => {

    const { name, location, contact, email, employee_id } = req.body
    if (!name || !location || !contact || !email || !employee_id) {
        res.status(400).send("Please Enter All fields")
    }

    // check same employee alredy exist
    const existingEmployeeId = await EmplyeeInformation.findOne({ where: { employees_id: `${employee_id}` } })
    if (existingEmployeeId) return res.status(400).json({ message: "Emmployee Id alreay Exists" })

    const existingEmployeeEmail = await EmplyeeInformation.findOne({ where: { email: `${email}` } })
    if (existingEmployeeEmail) return res.status(400).json({ message: "Email Id alreay Exists" })

    const userDetails = await EmplyeeInformation.create(
        {
            employees_id: employee_id,
            name: name,
            location: location,
            contact: contact,
            email: email,
            user_id: uuidv4.v4(),
        })
    res.send(userDetails)
}


// @desc   GET user data
// @route  POST /api/users/me
// @access Private
const getMe = async (req, res) => {
    console.log(req.email);
    const employeeInformation = await EmplyeeInformation.findOne({
        where: {
            email: req.email,
        }
    })
    res.json({ employeeInformation })
}

module.exports = { signin, signup, getMe, deleteData, register };





