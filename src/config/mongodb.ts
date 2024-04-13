const { mongoose, connection } = require('mongoose');
const dotenv = require('dotenv').config();


const mongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_STRING);
        console.log("[server]: Database successful Connected!");
        connect.connection.host;
        connect.connection.name;
    } catch (err){
        console.error(err);
        process.exit(1)
    }
}


module.exports = mongoDB;