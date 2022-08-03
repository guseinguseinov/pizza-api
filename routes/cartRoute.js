import express from "express";
import cart from "../controller/cart.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.get('/:id', authenticateToken , cart.viewCart);
cartRoute.post('/add', authenticateToken, cart.addToCart);


export default cartRoute;