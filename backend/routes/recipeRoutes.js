const express = require ('express')
const router = express.Router();
const {addRecipe, getRecipes, checkRecipes} = require('../controllers/recipeController')


router.post("/addRecipe", addRecipe);
router.get("/getRecipes", getRecipes);
router.post("/suggest-recipes", checkRecipes);


module.exports = router;