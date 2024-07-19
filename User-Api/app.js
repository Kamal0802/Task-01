const Express=require('express');

const Dbs=require('mongoose');

const router=require('./route');

const cors=require('cors')

const mongoose  = require('mongoose');

const app=Express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(Express.json())

app.use(cors());

app.use(Express.urlencoded({extended:false}))

app.use('/user',router);

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("DATABASE CONNECTED");

    app.listen(3000,()=>{
        console.log("SERVER IS RUNNING");
    })
})