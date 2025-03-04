const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema(
    {
        userName: {
            type: String
        },

        userId: {
            type: String
        },
        itemId: {
            type: String
        },
        comment:{
            type: String
        }
    }
)

module.exports = mongoose.model('comments', commentSchema);