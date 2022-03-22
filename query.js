const Pool = require('pg').Pool

const pool = new Pool({
    user: 'mohan',
    host: 'localhost',
    database: 'api',
    password: 'mohan',
    port: '5432',
})

//get all details

const getUsers = (req, res) => {
    pool.query('SELECT * from users ORDER by id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// get user by id
const getUsersById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * from users WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// post new user
const createNewUser = (req, res) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO users (name,email) VALUES ($1, $2)', [name, email], (errors, results) => {
        if (errors) {
            throw errors
        }
        res.status(201).send(`new User added with ID ${results.insertId}`)
    })
}

//update exsisting data
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)

    const { name, email } = req.body;
    pool.query('UPDATE users SET name = $1, email =$2 WHERE id = $3 ', [name, email, id], (errors, results) => {
        if (errors) {
            throw new Error("can't update the user")
        }

        res.status(200).send(`USER modified with ID: ${id}`)
    })

}

// delete the user with ID

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE from users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`user Deleted with id ${id}`)
    })

}



module.exports = { getUsers, getUsersById, createNewUser, updateUser, deleteUser }