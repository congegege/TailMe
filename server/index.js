const express = require('express')
const morgan = require("morgan")
const app = express()
const port = 3000

//import handlers
const {getAllAlcoholic,getAllNonAlcoholic,getSingleRecipe} = require ("./handlers/recipeHandler.js")

app.use(morgan("tiny"));

//All the endpoints
//get certain recipes by Id
app.get("/api/cocktails/:id", getSingleRecipe);
//get all the alcoholic recipes
app.get("/api/cocktails/alcoholic", getAllAlcoholic);
//get all the Non-alcoholic recipes
app.get("/api/cocktails/non_alcoholic", getAllNonAlcoholic);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})