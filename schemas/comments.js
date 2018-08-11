import mongoose from 'mongoose'
const Schema = mongoose.Schema
const commentsSchema = new Schema (
    {
        comments:[
            {
                commenter:{
                  type: String,
                  required : true
                },
                comment:{
                  type: String,
                  required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    }
)
module.exports = mongoose.model('comments',commentsSchema)