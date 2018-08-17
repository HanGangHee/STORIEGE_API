
import {Router} from 'express'

import {login} from './login.controller'
import {join} from './join.controller'
import {check} from './check.controller'
import authMiddleware from '../../middlewares/auth'
const router = Router()

router.get('/', (req, res) => {
    console.log("GET /auth ALIVE")
    res.send("User Page is working")
})


router.post('/join', join)
router.post('/login', login)
router.get('/check', authMiddleware, check)

module.exports = router

