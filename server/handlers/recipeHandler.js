const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//get single recipes detail
const getSingleRecipe = async(req,res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const id = req.params.id;

    try{
        await client.connect();
        const db = client.db("cocktails");

        const result = await db.collection("recipes").findOne({idDrink:id});

        await client.close();

        if(!result){
            return res.status(400).json({status:400,massage:"idDrink not valid"})
        }

        return res.status(200).json({status:200,massage:"success",data:result});
    }
    catch(err){
        return res.status(400).json({status:400,massage:err})
    }
}

//get all the alcoholic recipes
const getAllAlcoholic = async(req,res) =>{
    const client = new MongoClient(MONGO_URI,options);

    try{
        await client.connect();
        const db = client.db("cocktails");

        const result = await db.collection("recipes").find({strAlcoholic:"Alcoholic"}).toArray();

        await client.close();

        return res.status(200).json({status:200,massage:"success",data:result});
    }
    catch(err){
    return res.status(400).json({status:400,massage:err})
    }
}

//get all the Non-alcoholic recipes
const getAllNonAlcoholic = async(req,res) =>{
    const client = new MongoClient(MONGO_URI,options);
    
    try{
        await client.connect();
        const db = client.db("cocktails");
    
        const result = await db.collection("recipes").find({strAlcoholic:"Non alcoholic"}).toArray();
    
        await client.close();

        return res.status(200).json({status:200,massage:"success",data:result});
    }
    catch(err){
        return res.status(400).json({status:400,massage:err})
    }
    }

module.exports = {getAllAlcoholic,getAllNonAlcoholic,getSingleRecipe}