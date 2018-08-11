
import {Router} from 'express'
import wikis from '../../schemas/wikis'

const router = Router()

router.get('/', (req, res) => {
    console.log("GET /wikis ALIVE")
    wikis.find()
        .then((wikis) => {
            console.dir(wikis)
            console.log(wikis[0])
        })
        .catch((error) => {
            console.error(error)
            next(error)
        })
    res.send("Wikis Page is working")
})

module.exports = router

