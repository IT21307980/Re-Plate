const mongoose = require ('mongoose')

const recipeSchema = new mongoose.Schema(
    {
        recipeId : { type: String},
        ownerId : { type: String, require: true},
        owner : { type: String, require: true},
        title: String,
        ingredients: [String], // Array of ingredients
        instructions: String, // Optional detailed steps
        image: String,
    },
    { timestamps: true}
)


module.exports = mongoose.model('recipes', recipeSchema);