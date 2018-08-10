import mongoose from 'mongoose'
const Schema = mongoose.Schema
const {Types: ObjectId} = Schema
const wikisSchema = new Schema (
    {
        //version: Number,
        title : {
            type:String,
            required: true,
        },
        content : {
            type: String
        },
        write_time: {
            type: Date,
            default: Date.now()
        },
        user_id: {
            type: String
        },
        parent_id : {
            type: ObjectId
        },
        likes : {
            type: Number
        },
        dislikes : {
            type: Number
        },
        tags : {
            type: Array
        },
        // comment : {
        //
        // }
    }
)
module.exports = mongoose.model('wikis',wikisSchema)