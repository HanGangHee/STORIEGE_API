import mongoose from 'mongoose'
import {mongoDB_config} from '../config/config'

//connect to mongodb server
var db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('Connected to mongod server')
})
let {host, port, database} = mongoDB_config
let url = 'mongodb://' + host + ':' + port + '/' + database
mongoose.connect(url)