const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//get the ingredients
const getIngredients = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {name} = req.params;

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("ingredients").findOne({strIngredient:name})

    if(!result){
        return res.status(400).json({status:200,massage:"invalid ingredient name",data:null});
    }

    return res.status(200).json({status:200,massage:"success",data:result});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

module.exports = {getIngredients}