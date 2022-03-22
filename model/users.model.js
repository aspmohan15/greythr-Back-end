const Sequelize = require('sequelize')
const db = require('../config/database')
const Users = db.define('users', {
    
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
})

module.exports = Users;
