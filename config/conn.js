const mongoose = require("mongoose");

const connDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL , {

        });

        console.log(`connected to host : ${conn.connection.host}`);
    }catch(err){
        console.log(err.message);
        process.exit()
    }
}

module.exports = connDB;