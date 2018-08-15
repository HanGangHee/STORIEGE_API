import mongoose from 'mongoose'
const Schema = mongoose.Schema
const hashtagSchema = new Schema (
    {
        tag:String,
        wikis: [
            {
                num : Number
            }
        ]
    }
)
module.exports = mongoose.model('hashtag',hashtagSchema)