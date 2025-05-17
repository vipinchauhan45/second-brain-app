import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute.js'
import contentRouter from './routes/contentRoute.js'

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;
const mongoURI = process.env.MONGOOSE_CONNECTION_STRING;

app.use('/api/v1', userRouter);
app.use('/api/v1', contentRouter);


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

