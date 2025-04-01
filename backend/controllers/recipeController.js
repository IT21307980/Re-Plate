const Recipes = require('../models/recipeModel');
const cosineSimilarity = require('cosine-similarity');

// Normalize ingredients to lowercase
const normalizeIngredients = (ingredients) => {
  if (!Array.isArray(ingredients)) {
      throw new Error("Ingredients must be an array");
  }
  return ingredients
      .filter((ingredient) => ingredient) // Filter out null/undefined
      .flatMap((ingredient) => ingredient.split(',').map((i) => i.trim().toLowerCase()));
};



// Function to calculate cosine similarity
function calculateSimilarity(recipeIngredients, userIngredients) {
  const allIngredients = Array.from(new Set([...recipeIngredients, ...userIngredients]));
  const recipeVector = allIngredients.map((ing) => (recipeIngredients.includes(ing) ? 1 : 0));
  const userVector = allIngredients.map((ing) => (userIngredients.includes(ing) ? 1 : 0));

  const similarity = cosineSimilarity(recipeVector, userVector);
  return Math.round(similarity * 100); // Convert to percentage
}

// Add a recipe
const addRecipe = async (req, res) => {
  const { recipeId, ownerId, owner, title, ingredients, instructions, image } = req.body;

  try {
    const result = await Recipes.create({
      recipeId,
      ownerId,
      owner,
      title,
      ingredients,
      instructions,
      image,
    });
    res.send({ status: 'Ok', data: result });
  } catch (error) {
    console.log('Recipe adding failed!');
    res.status(500).json({ message: error.message });
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const data = await Recipes.find();
    res.send({ status: 'Ok', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Check recipes for similarity
const checkRecipes = async (req, res) => {
  const { ingredients } = req.body;

  //console.log("Received ingredients:", ingredients);
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "Please provide a list of ingredients." });
  }

  try {
    const userIngredients = normalizeIngredients(ingredients);
    //console.log("Normalized user ingredients:", userIngredients);

    const recipes = await Recipes.find();

    const results = recipes.map((recipe) => {
      const recipeIngredients = normalizeIngredients(recipe.ingredients || []);
      //console.log("Normalized recipe ingredients:", recipeIngredients);

      const similarity = calculateSimilarity(recipeIngredients, userIngredients);
      //console.log("Similarity for recipe:", recipe.title, "=", similarity);

      return {
        ...recipe._doc,
        similarityPercentage: similarity,
      };
    });

    const sortedResults = results.sort((a, b) => b.similarityPercentage - a.similarityPercentage);

    res.json(sortedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { addRecipe, getRecipes, checkRecipes };
