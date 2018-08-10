
import express from 'express'

import {login} from './login.controller'
import {join} from './join.controller'
import {check} from './check.controller'
import authMiddleware from '../../middlewares/auth'
const router = express.Router()

router.get('/', (req, res) => {
    console.log("GET /users ALIVE")
    res.send("User Page is working")
})


router.post('/join', join)
router.post('/login', login)

router.use('/check', authMiddleware)
router.get('/check', check)

module.exports = router
