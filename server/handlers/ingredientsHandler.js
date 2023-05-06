const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//get the ingredients
const getAlcoholicIngredients = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("ingredients").find({strAlcohol:"Yes"}).toArray()

    client.close();
    return res.status(200).json({status:200,massage:"success",data:result});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

const getNonAlcoholicIngredients = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("ingredients").find({strAlcohol:"No"}).toArray()

    client.close();
    return res.status(200).json({status:200,massage:"success",data:result});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

module.exports = {getAlcoholicIngredients,getNonAlcoholicIngredients}