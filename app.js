
import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan'


import index from './router/index'
import {JWT} from './credential'

const app = express()

module.exports = app

app.use(express.static('public'))
// parse JSON and URL_encoded query
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//print log on console
app.use(morgan('dev'))
// route 설정
app.use(index)
// JWT KEY SET
app.set('jwt-secret', JWT.secret)



const port = process.env.port || 3000

if(!module.parent){
    app.listen(port)
}
console.log("Application started. Listening on port:" + port)




// app.get('/1', function (req, res) {
//     db.query('SELECT * FROM user', (err, rows, fields) => {
//         if(err) throw err
//         let result
//         console.log(JSON.stringify(rows))
//         result = JSON.stringify(rows[0])
//         res.send(result)
//     })
// })
// app.get('/2', function (req, res) {
//     res.type('text/plain')
//     res.send("한강희's  /2  change")
// })
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

