const express = require('express');
const {config} = require('dotenv');
const path = require('path')
const cors = require('cors');
const app = express();
require('./model/user');
// Env variables access by running config
config();
// connect to the database  
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

// Database
const User = mongoose.model("User"); 

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:process.env.FRONTEND_URL,
    })
)

app.use("/api", require("./routes/data_API"));
app.use("/user", require("./routes/user"));

app.use(express.static(path.join(__dirname, './../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../frontend/build/index.html'));
});

app.listen(4000,()=> console.log('Server started on port 4000'));
