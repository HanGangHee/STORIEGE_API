import mongoose from 'mongoose'

const Schema = mongoose.Schema
const {types: ObjectId} = Schema
const wikisSchema = new Schema (
    {
        no: [
                {
                    version: Number,
                    title : String,
                    content : String,
                    write_time: Date,
                    user_id: String,
                    parent_no : Number,
                    likes : Number,
                    dislikes : Number,
                    tags : Array
                }
        ]
    }
)