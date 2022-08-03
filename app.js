import express from "express";
import mongoose from "mongoose";
import { config } from 'dotenv';

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

 
config();
await mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoute);
app.use('/products', productRoute);


export default app;