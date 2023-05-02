const mongoose=require('mongoose');
const dataBaseConnection=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database connect");
    }).catch(()=>{
        console.log("database connection failed");
    })
}
module.exports=dataBaseConnection;