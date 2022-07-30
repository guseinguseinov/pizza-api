import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    items:[ {type: "ObjectId", ref: "products"}],
    user: {
        type: "ObjectId",
        ref: "users",
    },
    totalCost:Number
}, {
    timestamps: true,
});

const CartModel = mongoose.model('carts', CartSchema);

export default CartModel;