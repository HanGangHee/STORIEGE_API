
import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
    console.log("GET /api/User ALIVE")
    res.send("api/user Page is working")
})

module.exports = router

