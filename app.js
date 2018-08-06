
import express from 'express';
import morgan from 'morgan'


import index from './routes/index'
import {JWT} from './credential'

const app = express()

module.exports = app

//print log on console
app.use(morgan('dev'))

app.use(express.static('public'))
// parse JSON and URL_encoded query
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// route 설정
app.use(index)
// JWT KEY SET
app.set('jwt-secret', JWT.secret)

const port = process.env.port || 3000
if(!module.parent){
    app.listen(port)
    console.log("Application started. Listening on port:" + port)
}

