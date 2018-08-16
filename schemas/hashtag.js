import mongoose from 'mongoose'
const Schema = mongoose.Schema
const hashtagSchema = new Schema (
    {
        _id:String,   //태그 명
        wikis: Array
    }
)
module.exports = mongoose.model('hashtag',hashtagSchema)