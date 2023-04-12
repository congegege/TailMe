const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//store the new user data
const createUsers = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);

    try{
        await client.connect();
        const db = client.db("cocktails");

        const result = await db.collection("users").findOne({sub:req.body.sub})
    
        //only store the data when cant find the user
        if(!result){
            await db.collection("users").insertOne(req.body)
        }
        
        client.close();
        return res.status(200).json({status:200,message:"user added",data: req.body})
        
        
    }
    catch (err) {
        return res.status(400).json({status:400,err:err})
    }
    }

module.exports = {createUsers}