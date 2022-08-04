import express from 'express';
import user from '../controller/user.controller.js';
import cart from '../controller/cart.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const userRoute = express.Router();
    const imageUpload = upload.single('profilePicture');

userRoute.post('/register', imageUpload, user.register);
userRoute.post('/login', user.login);
userRoute.patch('/edit/:id', imageUpload, authenticateToken ,user.changeUserInfo);
userRoute.delete('/delete/:id', authenticateToken, user.deleteUser);

// add to cart 
userRoute.post('/:id/cart', authenticateToken, cart.addToCart); 
userRoute.delete('/:id/cart/:productId', authenticateToken, cart.removeFromCart); // send cartId from headers

export default userRoute;