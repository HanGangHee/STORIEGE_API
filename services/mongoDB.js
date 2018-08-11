import mongoose from 'mongoose'
import {mongoDB_config} from '../config/config'

let {user, pwd, host, port, database} = mongoDB_config
let url = 'mongodb://' + user + ":" + pwd + "@" + host + ':' + port + '/admin'

const connect = () => {
    mongoose.connect(url, {
        dbName: database,
        useNewUrlParser : true
    }, (err) => {
        if (err) console.error('MongoDB connection fail!')
        else console.log('MongoDB connection success!')
    })
}

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection fail!')
})
mongoose.connection.on('disconnected', () => {
    console.error("MongoDB disconnected, 재연결 시도")
    connect()
})

module.exports = connect
