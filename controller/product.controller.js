import generateResponseMessage from '../global/index.js';
import ProductModel from '../models/Product.js';

const product = {
    async getAllProducts(req, res) {
        const allProducts =
            await ProductModel.find()
                .populate('reviews')
                .exec()

        res.status(200).json(generateResponseMessage(200, null, allProducts));
    },
    async getProduct(req, res) {
        const product = await ProductModel.findById(req.params.id).populate('reviews').exec();
        res.status(200).json(generateResponseMessage(200, null, product));
    },
}

export default product; 