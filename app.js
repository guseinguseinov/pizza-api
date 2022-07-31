import express from "express";
import userRoute from "./routes/userRoute.js";
import mongoose from "mongoose";
import { config } from 'dotenv';
import productRoute from "./routes/productRoute.js";
import adminRoute from "./routes/admin/adminRoute.js";
 

// admin 

config();
await mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();
const admin = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoute);
app.use('/products', productRoute);


// admin
admin.use(express.urlencoded({ extended: true }));
admin.use(express.json());

admin.use('/', adminRoute);


export {app , admin};