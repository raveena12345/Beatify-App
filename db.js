const mongoose = require('mongoose');

module.exports = async() =>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'BeatifyDB'
    };
    try {
        await mongoose.connect(process.env.DB, connectionParams)
        console.log("connected to db")

        
    } catch (error) {
        console.log("could not connect to db")
        
    }
};