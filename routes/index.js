import {Router} from 'express'
import users from './users/users'
import wikis from './wikis/wikis'
const router = Router()


router.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World')
})


router.use('/users', users)
router.use('/wikis', wikis)

module.exports = router