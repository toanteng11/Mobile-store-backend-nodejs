const mongoose = require('mongoose'); // khai bao kết nối với database mogoose

module.exports.connect = async () =>{

    try{
       await  mongoose.connect(process.env.MONGO_URL);
        console.log("Connect Sucessfull !");
    }catch(error){
        console.log("Connect Error");
    }
}

