const {MongoClient} = require ("mongodb");


require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//store the user selected date
const postCalendarDays = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const {sub,date} = req.body;
    const query = {sub:sub};
    const updateOldDayValue = {$set:{"date" : date}}
    
try{
    await client.connect();
    const db = client.db("cocktails");
    
    const result = await db.collection("drinkDays").findOne({sub:sub})

    if(result){
        await db.collection("drinkDays").updateOne(query,updateOldDayValue)

    }
    else{
        await db.collection("drinkDays").insertOne({...req.body});
    }

    client.close();
    return res.status(200).json({status:200,message:"selected days added",data: req.body})
}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}

//store the user selected date
const getselectedDays = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const {sub} = req.params;
    
try{
    await client.connect();
    const db = client.db("cocktails");
    
    const result = await db.collection("drinkDays").findOne({sub:sub})

    client.close();

    if(result){
        return res.status(200).json({status:200,message:"selected days get!",data: result.date})
    }

}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}

module.exports = {postCalendarDays,getselectedDays}