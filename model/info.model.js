const Sequelize = require('sequelize')
const db = require('../config/database')
const Details = db.define('employees', {

    employees_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    location: {
        type: Sequelize.STRING,
    },
    contact: {
        type: Sequelize.BIGINT,
    },
    email: {
        type: Sequelize.STRING,
    },
    user_id: {
        type: Sequelize.STRING,
    }
});

module.exports = Details;


// const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'mohan',
//     host: 'localhost',
//     database: 'api',
//     password: 'mohan',
//     port: '5432',
// })


// module.exports = { pool }



