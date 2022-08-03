import generateResponseMessage from "../global/index.js";
import CartModel from "../models/Cart.js";

const cart = {
    async viewCart(req, res) {
        const cart = await CartModel.findById(req.params.id).populate({
            path: 'User'
        }).exec();
        res.status(200).json( generateResponseMessage(200, null, cart));
    },
    async addToCart(req, res) {
        const newProduct = await CartModel(req.body);
        await newProduct.save(); 
        res.status(201).json( generateResponseMessage(200, 'added to cart', newProduct));
    }
}

export default cart;