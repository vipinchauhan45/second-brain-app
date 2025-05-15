import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoURI = process.env.MONGOOSE_CONNECTION_STRING;

async function connect_db(){
    try{
        await mongoose.connect(mongoURI);
        app.listen(port,()=>{
            console.log(`listening at port number ${port}`);
        })
        console.log("sucessfully connected with Mongodb");
    }
    catch(e){
        console.log("error in connection with DataBase ",e.message);
    }
}

connect_db();

