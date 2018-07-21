import express from 'express'
import db from '../../config/mariaDB'

const router = express.Router()

router.get('/', (req, res) => {
    console.log("GET /user ALIVE")
    res.send("Join My Web Page")
})
router.get('/login', (req, res) => {
    console.log("GET /user/login")
    db.getConnection((err , connection) => {
        if(err){
            console.log("[DB Connection Error] user data")
            return
        }
        let sql = "select * from user"
        connection.query(sql, (err, rows) => {
            console.log("[DB Connection Success] user data = " + rows)
            res.send(JSON.stringify(rows[0]))
        })
        connection.release //mariadb connection pool에 release
    })
})
router.post('/join', (req, res) => {

})

module.exports = router

