import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    product : { 
        type: "ObjectId", 
        ref: "products" 
    },
    user: {
        type: "ObjectId",
        ref: "User",
    },
    numberOfproduct: {
        type: Number,
        default: 1,
    }
}, {
    timestamps: true,
});

const CartModel = mongoose.model('carts', CartSchema);

export default CartModel;