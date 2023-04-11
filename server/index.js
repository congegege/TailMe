const express = require('express')
const morgan = require("morgan")
const app = express()
const port = 3000

//import handlers
const {getCategoryRecipe,getRandomRecipe,getCategory,getAllAlcoholic,getAllNonAlcoholic,getSingleRecipe} = require ("./handlers/recipeHandler.js");
const {postComment,getComments} = require("./handlers/commentHandler");
const {getIngredients} = require("./handlers/ingredientsHandler")


app.use(morgan("tiny"));
app.use(express.json())

//All the endpoints

//for recipes
//fet random recipe
app.get("/api/randomCocktail", getRandomRecipe)
//get certain recipes by Id
app.get("/api/cocktails/:id", getSingleRecipe);
//get category list
app.get("/api/categories", getCategory)
//get recipe underneath certain category
app.get("/api/categories/recipes", getCategoryRecipe)
//get all the alcoholic recipes
app.get("/api/cocktails/alcoholic", getAllAlcoholic);
//get all the Non-alcoholic recipes
app.get("/api/cocktails/non_alcoholic", getAllNonAlcoholic);

//for Ingredients
app.get("/api/ingredients/:name",getIngredients)

//for comments
//get all the comments by recipes Id
app.get("/api/comments/:id",getComments)
//post the comment
app.post("/api/comments", postComment)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})