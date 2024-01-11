
//npm i express mongoose dotenv nodemon
require("dotenv").config();
require("express-async-errors")             //no need to use try catchm, it async errors

//Importing express
const express = require('express');
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlists');
const searchRoutes = require('./routes/search');
// const user = require('./Model/user')

//Initialization
const app = new express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/", searchRoutes);




//middleware
app.use(express.json());


//final
app.listen(5000,()=>{
    console.log("Port 5000 is up and running")

})




