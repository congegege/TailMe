const express = require('express')
const morgan = require("morgan")
const app = express()
const port = 3000

//import handlers
const {getAllRecipes,getCategoryRecipe,getRandomRecipe,getCategory,getAllAlcoholic,getAllNonAlcoholic,getSingleRecipe} = require ("./handlers/recipeHandler.js");
const {postComment,getComments} = require("./handlers/commentHandler");
const {getIngredients} = require("./handlers/ingredientsHandler");
const {getUsers} = require("./handlers/userHandler");
const {postRate,getRateAverage} = require("./handlers/rateHandler");
const {postCollection, getCollections} = require("./handlers/collectionHandler");


app.use(morgan("tiny"));
app.use(express.json())

//All the endpoints

//for recipes
//get all recipes
app.get("/api/recipes", getAllRecipes)
//get random recipe
app.get("/api/randomCocktail", getRandomRecipe)
//get certain recipes by Id
app.get("/api/cocktails/:id", getSingleRecipe);
//get category list
app.get("/api/categories", getCategory)
//get recipe underneath certain category
app.get("/api/categories/recipes", getCategoryRecipe)
//get all the alcoholic recipes no
app.get("/api/cocktails/alcoholic", getAllAlcoholic);
//get all the Non-alcoholic recipes no
app.get("/api/cocktails/non_alcoholic", getAllNonAlcoholic);

//for Ingredients no
app.get("/api/ingredients/:name",getIngredients);

//for rating
//get the rate average
app.get("/api/rateAverage/:id",getRateAverage);
//post the rate
app.post("/api/rate", postRate)

//for comments
//get all the comments by recipes Id
app.get("/api/comments/:id",getComments);
//post the comment
app.post("/api/comments", postComment);

//get users info
app.get("/api/users/:sub",getUsers);

//for collection
//get the collection that user added
app.get("/api/users/collections/:sub",getCollections);
//add the drink into the collection list
app.post("/api/users/collections",postCollection);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})