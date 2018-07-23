
import express from 'express'

import db from '../../config/mariaDB'
import {auth} from './auth.controller'
const router = express.Router()

router.get('/', (req, res) => {
    console.log("GET /user ALIVE")
    res.send("User Page is working")
})
// router.post('/register', (req, res) => {
//
// })
router.post('/auth', auth)



module.exports = router

