import express from 'express';
import dbConn from './config/mariaDB'

var db = dbConn.dbConnect()
const app = express();

module.exports = app

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World');
});

var port = process.env.port || 3000

if(!module.parent){
    app.listen(port)
}
console.log("Application started. Listening on port:" + port)




app.get('/1', function (req, res) {
    db.query('SELECT * FROM user', (err, rows, fields) => {
        if(err) throw err
        let result
        console.log(JSON.stringify(rows))
        result = JSON.stringify(rows[0])
        res.send(result)
    })
    // res.type('text/plain')
    // res.send(result)
})
app.get('/2', function (req, res) {
    res.type('text/plain')
    res.send("한강희's  /2")
})
//
// app.use(function (req, res) {
//     res.status(404)
//     res.render('404')
// })
//
// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500)
//     res.render('500')
// })

