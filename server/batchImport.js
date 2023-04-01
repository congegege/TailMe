const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {MongoClient} = require ("mongodb");


require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    //create the list that contain all 26 letters
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet =  alpha.map((x) => String.fromCharCode(x));
    
    try {
        //connect to the client
    await client.connect();
    const db = client.db("drinks");
    const collection = db.collection('recipes');

    //fetch the data by searching each letter, insert the result into the database
    for(const letter of alphabet) {
        const cocktailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
        const response = await fetch(cocktailsUrl);
        const data = await response.json();
        const cocktails = data.drinks;

        //coonditional rendering to avoid the null result
        if(cocktails){
            for (const cocktail of cocktails) {
                await collection.insertOne(cocktail);
            }
        }
        
    }
    //close client
    await client.close();
    }

    catch (err) {
        console.log("ERR", err);
    }

};

batchImport();