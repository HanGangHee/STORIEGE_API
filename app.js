
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

