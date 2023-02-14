const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// let MONGO_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"

module.exports = connectDB;