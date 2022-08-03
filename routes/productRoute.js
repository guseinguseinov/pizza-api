import express from 'express';
import product from '../controller/product.controller.js';
import review from '../controller/review.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const productRoute = express.Router();

productRoute.get('/', product.getAllProducts);
productRoute.get('/:id', product.getProduct);

// reviews
productRoute.post('/:id/reviews', authenticateToken, review.addReview);
productRoute.patch('/:id/reviews/:reviewId', authenticateToken, review.editReview);
productRoute.delete('/:id/reviews/:reviewId', authenticateToken, review.deleteReview);

export default productRoute;
