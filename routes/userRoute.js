import express from 'express';
import userCtrl from '../controller/user.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const userRoute = express.Router();
const imageUpload = upload.single('profilePicture');

userRoute.post('/register', imageUpload, userCtrl.register);
userRoute.post('/login', userCtrl.login);
userRoute.patch('/edit/:id', imageUpload, authenticateToken ,userCtrl.changeUserInfo);

export default userRoute;