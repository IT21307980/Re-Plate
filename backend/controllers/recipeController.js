const Recipes = require ('../models/recipeModel')

//Normalize ingredients to lowercase
function normalizeIngredients(ingredients) {
  return ingredients
    .filter((ingredient) => ingredient !== null && ingredient !== undefined) // Filter out null or undefined values
    .map((ingredient) => ingredient.toString().toLowerCase()); // Convert to string and normalize to lowercase
}


const addRecipe = async(req,res) =>{

    const {recipeId, ownerId, owner, title, ingredients, instructions, image} = req.body;

        try {
            const result = await Recipes.create({
              recipeId,
              ownerId, 
              owner, 
              title, 
              ingredients : normalizeIngredients(ingredients), 
              instructions, 
              image
            });
            res.send({status: 'Ok', data:result})
        } catch (error) {
            console.log("Recipe adding failed!")
            res.status(500).json({ message: error.message });
        }
}


const getRecipes = async(req,res) =>{

    try {
        await Recipes.find().then(data =>{
            res.send({status: 'Ok', data:data})
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const cosineSimilarity = require("cosine-similarity");

// Function to calculate cosine similarity
function calculateSimilarity(recipeIngredients, userIngredients) {
  const allIngredients = Array.from(new Set([...recipeIngredients, ...userIngredients]));
  const recipeVector = allIngredients.map((ing) => (recipeIngredients.includes(ing) ? 1 : 0));
  const userVector = allIngredients.map((ing) => (userIngredients.includes(ing) ? 1 : 0));
  return cosineSimilarity(recipeVector, userVector);
}


const checkRecipes = async (req, res) => {
    const { ingredients } = req.body;
    //console.log("received ",ingredients)
  
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide a list of ingredients." });
    }
  
    try {
      const userIngredients = normalizeIngredients(ingredients);
      console.log(ingredients)
      const recipes = await Recipes.find(); // Fetch all recipes from the database
  
      // Calculate similarity for each recipe
      const results = recipes.map((recipe) => ({
        ...recipe._doc,
        similarity: calculateSimilarity(normalizeIngredients(recipe.ingredients), userIngredients),
      }));
  
      // Sort by similarity (descending)
      const sortedResults = results.sort((a, b) => b.similarity - a.similarity);
  
      // Return top matches
      res.json(sortedResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };


module.exports = {addRecipe, getRecipes, checkRecipes}