const express = require('express')
const morgan = require("morgan")
const app = express()
const port = 3000

//import handlers
const {getAllRecipes,getCategoryRecipe,getRandomRecipe,getCategory,getAllAlcoholic,getAllNonAlcoholic,getSingleRecipe} = require ("./handlers/recipeHandler.js");
const {postComment,getComments} = require("./handlers/commentHandler");
const {getAlcoholicIngredients , getNonAlcoholicIngredients} = require("./handlers/ingredientsHandler");
const {getUsers,getRandomUsers} = require("./handlers/userHandler");
const {postRate,getRateAverage,getUserRate} = require("./handlers/rateHandler");
const {postCommunityCollection , getCommunityCollections,deleteCollectedCommunityCollection,getUserCommunityCollectedCollection} = require("./handlers/communityCollection")
const {postCollection, getCollections , getUserCollectedCollection,deleteCollectedCollection} = require("./handlers/collectionHandler");
const {createPost, getPosts, getSinglePost} =  require("./handlers/communityHandler");
const {getRatedDrink, getUserComments,getUserPosts} = require("./handlers/profileHandler");
const {getAllPopularDrink} = require("./handlers/popularDrinkHandler")

app.use(morgan("tiny"));
app.use(express.json({limit: '50mb'}));


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

//for ingresients(strech)
//getting alcoholic ingredients
app.get("/api/AlcoholicIngredients",getAlcoholicIngredients);
//getting nonAlcoholic ingredients
app.get("/api/NonAlcoholicIngredients",getNonAlcoholicIngredients);

//for rating
//get the rate average
app.get("/api/rateAverage/:id",getRateAverage);
//get the rate user rated under certain drink
app.post("/api/userRate",getUserRate)
//post the rate
app.post("/api/rate", postRate)

//for comments
//get all the comments by recipes Id
app.get("/api/comments/:id",getComments);
//post the comment
app.post("/api/comments", postComment);

//get users info
app.get("/api/users/:sub",getUsers);
app.get("/api/randomUsers/",getRandomUsers);

//for collection
//get the collection that user added
app.get("/api/users/collections/:sub",getCollections);
//get the community collection that user added
app.get("/api/users/communityCollections/:sub",getCommunityCollections);
//add the drink into the collection list
app.post("/api/users/collections",postCollection);
//add the community post into the collection list
app.post("/api/users/communityCollections",  postCommunityCollection);
//check whether this drink is collected or not
app.post("/api/users/collectedCollections",getUserCollectedCollection);
//check whether this drink is collected or not
app.post("/api/users/collectedCommunityCollections",getUserCommunityCollectedCollection);
// to delete the collection that user collected
app.delete("/api/users/deleteCollectedCollections",deleteCollectedCollection)
// to delete the collection that user collected
app.delete("/api/users/deleteCollectedCommunityCollections",deleteCollectedCommunityCollection)

//for community
//to get the posts underneat certain query
app.get("/api/community/posts", getPosts);
//to get the post by id
app.get("/api/community/posts/:id", getSinglePost);
//to store the content what user post in the community 
app.post("/api/community", createPost);


//for profile
//to get all the drink that user rated
app.get("/api/ratedDrink/:sub", getRatedDrink);
// to get all the comments that user posted
app.get("/api/userComments/:sub", getUserComments);
// to get all the posts that user posted in the community
app.get("/api/community/userPosts/:sub", getUserPosts);

//for popular Drink
// to get all the popular Drink
app.get("/api/popularDrink", getAllPopularDrink)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})