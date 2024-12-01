import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import journal from './routes/journal.js'
import users from './routes/users.js'

// import { authenticate } from './middlewares/auth.js';
const app=express();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));
app.use(express.json());
app.use('/journal',journal)
app.use('/user',users)
app.use(bodyParser.json({limit:"30mb",extended:"true"}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}))

const CONNECTION_URL="mongodb+srv://221501031:HPcr63PzUJOJuyTJ@cluster0.ajyr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
const PORT= process.env.PORT || 8000 ;

mongoose.connect(CONNECTION_URL

).then(()=>app.listen(PORT,()=>console.log(`port is running on ${PORT}`)
)).catch(()=>{
    console.log("Error staring the server");
    
})
