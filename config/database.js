const Sequelize = require('sequelize')

// const sequelize = new Sequelize('database', 'username', 'password', {

module.exports = new Sequelize('user', 'mohan', 'mohan', {
    host: 'localhost',
    dialect: 'postgres',
     
});

// db.authenticate()
//     .then(() => console.log("Db connected"))
//     .catch((err) => console.log(err))


