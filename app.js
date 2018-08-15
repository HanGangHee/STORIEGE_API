
import express from 'express';
import morgan from 'morgan'


import index from './routes/index'
import {JWT} from './config/config'
import mongoDB_connect from './services/mongoDB'

const app = express()

module.exports = app

mongoDB_connect()
// JWT KEY SET
app.set('jwt-secret', JWT.secret)

//print log on console
app.use(morgan('dev'))

app.use(express.static('public'))
// parse JSON and URL_encoded query
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use(index)


//404 not found
app.use((req, res, next) => {
    res.status(404).send('NOT FOUND')
})

//500 Error
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('SERVER ERROR')
})
const port = process.env.port || 3000
if(!module.parent){
    app.listen(port)
    console.log("Application started. Listening on port:" + port)
}

