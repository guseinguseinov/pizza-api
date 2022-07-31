import express from 'express';
import { userLogin, userRegister } from '../controller/user.controller.js';
import upload from '../middleware/upload.js';

const userRoute = express.Router();
const imageUpload = upload.single('profilePicture');

userRoute.post('/register', imageUpload, userRegister);
userRoute.post('/login', userLogin);

export default userRoute;