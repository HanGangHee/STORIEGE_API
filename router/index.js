import express from 'express'
import user from './user/user'
const router = express.Router()


router.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World')
})


router.use('/user', user)

module.exports = router