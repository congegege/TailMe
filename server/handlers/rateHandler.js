const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//get the rate average
const getRateAverage = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {id} = req.params;
//to store the rate in the list
const rateList = [];
//to store the caculation result fo the average value
let rateAverage = null;


try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("reviews").findOne({id})
    

    if(!result){
        return res.status(200).json({status:200,massage:"No Rate yet",data:null});
    }

    for(const rate of result.rates){
        //to push the rate inside the list， 0 is not counted minimum is 1
        if(rate.rate != 0 ){
            rateList.push(rate.rate)
        }
        
    }

    //caculate the sum first / length to get the average round it up to "X.X"
    rateAverage = Math.round((rateList.reduce((sum,curr)=>sum + curr) / rateList.length)*10)/10;

    client.close();
    
    return res.status(200).json({status:200,massage:"Average Rate caculated!",data:rateAverage});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

//post the rate
const postRate = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {id , rate , sub} = req.body;
const query = {id:id}
const updateValue = {$push : {"rates":{sub:sub,rate:rate}}} 
const updateOldRateValue = {$set:{"rates.$.rate" : rate}}

try{
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("reviews").findOne({id})

    //if there is already rate for this drink mean its in the database already then push this one into the array list
    if(!result){
        await db.collection("reviews").insertOne({id:id,"rates":[{sub:sub,rate:rate}]})
    }
    //if there is no rate yet, insert one with the drink Id
    else {
        //check whether user already did the rate, each user can do only one rate for each drink
        const isRated = await db.collection("reviews").findOne({id:id,rates:{$elemMatch:{sub:sub}}})
        //when cant find the user in the database means user can do the rate then update it into the database
        if(!isRated){
            await db.collection("reviews").updateOne(query,updateValue)
        }
        //when can find it then update it to the new rate which user select
        else{
            await db.collection("reviews").updateOne({id:id,rates:{$elemMatch:{sub:sub}}},updateOldRateValue)
        }
    }

    client.close();
    return res.status(200).json({status:200,message:"rate added",data: req.body})
}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}


module.exports = {postRate,getRateAverage}