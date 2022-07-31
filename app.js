import express from "express";
import userRoute from "./routes/userRoute.js";
import mongoose from "mongoose";
import { config } from 'dotenv';
 
config();
await mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoute);


export default app;