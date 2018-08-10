import express from 'express'
import users from './users/users'
import wikis from './wikis/wikis'
const router = express.Router()


router.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World')
})


router.use('/users', users)
router.use('/wikis', wikis)

module.exports = router