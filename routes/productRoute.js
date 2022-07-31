import express from 'express';
import product from '../controller/product.controller.js';

const productRoute = express.Router();

productRoute.get('/', product.getAllProducts);
productRoute.get('/:id', product.getProduct);

export default productRoute;
