const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//store the new user data
const getAllPopularDrink = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    

    try{
        await client.connect();
        const db = client.db("cocktails");

        const result = await db.collection("popularDrink").find().toArray();
    
        //only store the data when cant find the user
        if(!result){
            return res.status(400).json({status:400,massage:"popular drink not existed"})
        }
        
        client.close();
        return res.status(200).json({status:200,message:"popular found",data: result})
        
        
    }
    catch (err) {
        return res.status(400).json({status:400,err:err})
    }
    }

module.exports = {getAllPopularDrink}