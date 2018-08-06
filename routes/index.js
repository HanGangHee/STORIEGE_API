import express from 'express'
import users from './users/users'
const router = express.Router()


router.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World')
})


router.use('/users', users)

module.exports = router