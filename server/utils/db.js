const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/bhasha-ai/";

mongoose.connect(DB_URL);

const ConnectDb = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("RadhaKrishna \nDB Connected...")
    } catch (error){
        console.error("Database connection failed");
        process.exit(0);
    }
}

module.exports = ConnectDb;