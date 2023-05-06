const {MongoClient} = require ("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//store the new user data
const postContactForm = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    
try{
    await client.connect();
    const db = client.db("cocktails");

    await db.collection("contact").insertOne({id:uuidv4() , ...req.body});

    client.close();
    return res.status(200).json({status:200,message:"post added",data: req.body})
}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}

module.exports = {postContactForm}