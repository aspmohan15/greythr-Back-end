const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//index Route
app.get("/", (req, res) => { res.status(200).send("Server is up Postgress") })

// auth Route
app.use('/api/users', require('./routes/users.routes'))

// Databse
const db = require('./config/database')
db.authenticate().then(() => { console.log("Connected") }).catch((err) => console.log(err))

//server config
function main() {
    try {
        const PORT = process.env.PORT || 5001
        app.listen(PORT, () => { (console.log(`Server is running on ${PORT}`)) })

    } catch (err) {
        console.log(err);
    }
}
main()



