const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//get the comments
const getComments = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {id} = req.params;

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("reviews").findOne({id})

    if(!result){
        return res.status(200).json({status:200,massage:"No review yet",data:null});
    }

    return res.status(200).json({status:200,massage:"success",data:result.comment});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

//post the comment
const postComment = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {id , comment} = req.body;
const query = {id:id}
const updateValue = {$push : {"comment" : comment}} 

try{
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("reviews").findOne({id})

    if(!result){
        await db.collection("reviews").insertOne({id:id,"comment":[comment]})
    }
    else{
        await db.collection("reviews").updateOne(query,updateValue)
    }

    client.close();
    return res.status(200).json({status:200,message:"comment added",data: req.body})
}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}


module.exports = {postComment,getComments}