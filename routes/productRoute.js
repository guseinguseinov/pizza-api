import express from 'express';
import product from '../controller/product.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const productRoute = express.Router();

productRoute.get('/', product.getAllProducts);
productRoute.get('/:id', product.getProduct);
productRoute.post('/:id/reviews', authenticateToken, product.addComment);
productRoute.patch('/:id/reviews/:reviewId', authenticateToken, product.editComment);
productRoute.delete('/:id/reviews/:reviewId', authenticateToken, product.deleteComment);

export default productRoute;
