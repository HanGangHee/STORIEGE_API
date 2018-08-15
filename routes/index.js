import {Router} from 'express'
import auth from './auth/auth'
import api from './api/api'
const router = Router()


router.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World')
})

router.use('/auth', auth)
router.use('/api', api)

module.exports = router