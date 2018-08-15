
import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
    console.log("GET /api/wiki ALIVE")
    // wiki.find()
    //     .then((wiki) => {
    //         console.dir(wiki)
    //         console.log(wiki[0])
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //         next(error)
    //     })
    res.send("api/wiki Page is working")
})

module.exports = router

