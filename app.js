import express from "express";
import mongoose from "mongoose";
import { config } from 'dotenv';

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";

import adminRoute from "./routes/admin/adminRoute.js";
import adminProductRoute from "./routes/admin/productAdminRoute.js";
 
config();
await mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();
const admin = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

// admin
admin.use(express.urlencoded({ extended: true }));
admin.use(express.json());

admin.use('/', adminRoute);
admin.use('/products', adminProductRoute);

export {app , admin};