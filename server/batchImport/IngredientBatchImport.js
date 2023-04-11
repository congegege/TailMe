const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {MongoClient} = require ("mongodb");


require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const ingredientBatchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    //maxium Id for the ingredients
    const ingredientIdList = Array.from({length: 616}, (value, i) => i+1)

    
    
    try {
        //connect to the client
    await client.connect();
    const db = client.db("cocktails");
    const collection = db.collection("ingredients");

    //fetch the data by searching Id
    for(const ingredientId of ingredientIdList) {
        const ingredientUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${ingredientId}`;
        const response = await fetch(ingredientUrl);
        const data = await response.json();
        //To skip the null fetch result
        if(data.ingredients){
            const ingredientData = data[`ingredients`][0];

            //To match the pic url format
            let strIngredient = ingredientData.strIngredient;
            if(strIngredient.includes(" ")){
                strIngredient = strIngredient.replaceAll(" ","&20")
            }
            
            //database dont have the pic source, add it there
            if(ingredientData){
                await collection.insertOne({...ingredientData,"ingredientPic":`https://www.thecocktaildb.com/images/ingredients/${strIngredient}.png`});
            }
        }
    }
    // close client
    await client.close();
    }

    catch (err) {
        console.log("ERR", err);
    }

};

ingredientBatchImport();