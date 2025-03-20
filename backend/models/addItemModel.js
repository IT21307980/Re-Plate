const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema(
    {
        itemName:{
            type: String,
            required: true
        },
        ownerId:{
            type: String,
            required: true
        },
        quantity:{
            type: String,
           required: true
        },
        expireDate:{
            type: String,
           required: true
        },
        mediaFile:{
            type: String,
            
        },
        location:{
            type: String,
            required: true
        },
        contact:{
            type: String,
           required: true
        },
        itemType:{
            type: String,
           required: true
        },
        price:{
            type: String,
            
        },
        description:{
            type: String,
        }
    }
)



module.exports = mongoose.model('items', itemSchema);
