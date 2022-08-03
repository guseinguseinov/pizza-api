import generateResponseMessage from "../global/index.js";
import CartModel from "../models/Cart.js";
import UserModel from "../models/User.js";

const cart = {
    // cart
    async addToCart(req, res) {
        const userId = req.params.id;
        const productId = req.headers.productid;
        console.log(userId)
    }
}

export default cart;