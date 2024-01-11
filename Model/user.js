const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// const { User } = require('./user');


// const connection = require("./db"); // Import the database connection function

// // Call the connection function to establish a connection
// connection();

// mongoose.connect("mongodb+srv://raveenaramesh3003:test@cluster0.pahuprc.mongodb.net/BeatifyDb?retryWrites=true&w=majority")
// .then(()=>{
//     console.log("db connected");
// })
// .catch((err)=>console.log(err))

//schema
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        gender: {type: String, required: true},
        month: {type: String, required: true},
        date: {type: String, required: true},
        year: {type: String, required: true},
        likedSongs: {type: [String], default: []},
        playlists: {type: [String], default: []},
        isAdmin: {type: Boolean, default: false}
        
    }
);

//npm i jsonwebtoken joi joi-password-complexity

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id, name: this.name, isAdmin: this.isAdmin},
        process.env.JWTPRIVATEKEY,
        {expiresIn: "7d"}
        
    );
    return token;
};

const validate = (user) =>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        month: Joi.string().required(),
        date: Joi.string().required(),
        year: Joi.string().required(),
        gender: Joi.string().valid("male","female","non-binary").required()
    });
    return schema.validate(user)
}

const User = mongoose.model("user", userSchema);

module.exports = {User,validate};

