import generateResponseMessage from "../global/index.js";
import CartModel from "../models/Cart.js";
import UserModel from "../models/User.js";

const cart = {
    async addToCart(req, res) {
        const userId = req.params.id;
        const productId = req.headers.productid;

        const cartProduct = await CartModel({
            product: productId,
            user: userId,
        });

        await cartProduct.save();

        const userCart = await UserModel.findById(userId);
        userCart.cart.push(cartProduct);
        await userCart.save();

        res.status(200).json(generateResponseMessage(200, 'product added to the cart', null));
    },
    async removeFromCart(req, res){
        const userId = req.params.id;
        const productId = req.params.productId;
        const { cartid } = req.headers;

        console.log(userId, productId, cartid);

        const userCart = await UserModel.findByIdAndUpdate(
            userId,
            {
                $pull: { cart: cartid},
            },
            { new: true }
        );

        await CartModel.findByIdAndDelete(cartid); 

        res.status(200).json(generateResponseMessage(200, 'removed from cart', null));

    }
    
}

export default cart;