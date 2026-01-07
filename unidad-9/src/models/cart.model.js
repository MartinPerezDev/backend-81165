import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity : { type: Number }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;