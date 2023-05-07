const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//store the new user data
const getUsers = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const {sub} = req.params;

    try{
        await client.connect();
        const db = client.db("cocktails");

        const result = await db.collection("users").findOne({sub:sub})
    
        //only store the data when cant find the user
        if(!result){
            return res.status(400).json({status:400,massage:"user not existed"})
        }
        
        client.close();
        return res.status(200).json({status:200,message:"user found",data: result})
        
        
    }
    catch (err) {
        return res.status(400).json({status:400,err:err})
    }
    }

    //get random 3 users who post in community
    const getRandomUsers =async(req,res) =>{
    const client = new MongoClient(MONGO_URI,options);
    try{
        await client.connect();
        const db = client.db("cocktails");

        const result = await db.collection("community").aggregate([{$group:{ _id: "$userPicture"}}, {$limit:3}]).toArray()

        await client.close();

        return res.status(200).json({status:200,massage:"success",data:result});
    }
    catch(err){
        return res.status(400).json({status:400,massage:err})
    }
}

module.exports = {getUsers,getRandomUsers}