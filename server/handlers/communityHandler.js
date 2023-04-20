const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const {MongoClient} = require ("mongodb");
const cloudinary = require('cloudinary').v2;

require("dotenv").config();
const {MONGO_URI,CLOUD_NAME,CLOUD_KEY,CLOUD_KEY_SECRET} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_KEY_SECRET
});

//get all Posts
const getAllPosts = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("community").find().toArray();

    client.close();
    return res.status(200).json({status:200,massage:"success",data:result});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

//creat the post
const createPost = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {img} = req.body;

const date = format(new Date(), "yyyy.MM.dd");

try{
    await client.connect();
    const db = client.db("cocktails");

    const result = await cloudinary.uploader.upload(img,{
        folder:"recipes",
    })

    await db.collection("community").insertOne({id:uuidv4() , ...req.body,img:result.secure_url,date:date});

    client.close();
    return res.status(200).json({status:200,message:"post added",data: req.body})
}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}


module.exports = {createPost,getAllPosts}