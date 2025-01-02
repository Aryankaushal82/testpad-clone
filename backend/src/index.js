import express from 'express';
import dbConnect from './db/dbConnect.js'
import { app } from './app.js';

app.get('/', function(req, res){
    res.send("ok tested");
})

//server configuration
dbConnect().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server started on ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log(`error while starting server: ${error}`);
})
