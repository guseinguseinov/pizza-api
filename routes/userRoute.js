import express from 'express';
import { user } from '../controller/user.controller.js';
import upload from '../middleware/upload.js';

const userRoute = express.Router();
const imageUpload = upload.single('profilePicture');

userRoute.post('/register', imageUpload, user.register);
userRoute.post('/login', user.login);

export default userRoute;