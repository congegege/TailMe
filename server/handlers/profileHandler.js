const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


//get the ratedDrink
const getRatedDrink = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {sub} = req.params;
//to store the rate in the list
const ratedDrinkList = [];

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("reviews").find({rates:{$elemMatch:{sub:sub}}}).toArray();
    

    if(!result){
        return res.status(200).json({status:200,massage:"No Rate yet",data:ratedDrinkList});
    }

    for(const ratedDrink of result){
        const drinkInfo = await db.collection("recipes").findOne({idDrink:ratedDrink.id})
        
        for(const rating of ratedDrink.rates){
            
            if(rating.sub == sub && rating.rate !== 0){
                ratedDrinkList.push({drinkName:drinkInfo.strDrink,drinkImage:drinkInfo.strDrinkThumb,id:ratedDrink.id,rate:rating.rate})
            }
        }
    }

    client.close();
    
    return res.status(200).json({status:200,massage:"All rated Drink!",data:ratedDrinkList});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

//get the comments user post
const getUserComments = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const {sub} = req.params;
    //to store the rate in the list
    const ratedDrinkList = [];
    
    try {
        await client.connect();
        const db = client.db("cocktails");
    
        const result = await db.collection("reviews").find({comment:{$elemMatch:{sub:sub}}}).toArray();
    
        if(!result){
            return res.status(200).json({status:200,massage:"No Rate yet",data:ratedDrinkList});
        }
    
        for(const commentDrink of result){
            const drinkInfo = await db.collection("recipes").findOne({idDrink:commentDrink.id})
            
            for(const userComment of commentDrink.comment){
                
                if(userComment.sub == sub){
                    ratedDrinkList.push({drinkName:drinkInfo.strDrink,drinkImage:drinkInfo.strDrinkThumb,id:commentDrink.id,comment:userComment.content})
                }
            }
        }
    
        client.close();
        
        return res.status(200).json({status:200,massage:"All Comments",data:ratedDrinkList});
    }
    
    catch(err){
        return res.status(400).json({status:400,massage:err})
    }
    }

const getUserPosts =async (req , res)=>{
    const client = new MongoClient(MONGO_URI,options);
    const {sub} = req.params;
    //to store the post data
    const postList = []
    
    try {
        await client.connect();
        const db = client.db("cocktails");
    
        const result = await db.collection("community").find({sub:sub}).toArray();
        
        client.close();
        if(!result){
            return res.status(200).json({status:200,massage:"No Post yet",data:postList});
        }
    
        for(const post of result){
            
            postList.push({id:post.id,img:post.img,strDrink:post.strDrink})
                
            }
            return res.status(200).json({status:200,massage:"All posts",data:postList});
        }
        
        
    
    
    catch(err){
        return res.status(400).json({status:400,massage:err})
    }
}



module.exports = {getRatedDrink,getUserComments,getUserPosts}