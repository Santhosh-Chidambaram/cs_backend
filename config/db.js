const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongooseURI');

const connectDB = () =>{
    mongoose.set('useFindAndModify', false);
    mongoose.connect(db,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify: false,
    });
    mongoose.connection.on('connected',() =>{
        console.log("MongoDb Connected");
        
    })
    mongoose.connection.on('error',() =>{console.log("error");
    })

}

    
    

    


module.exports = connectDB;