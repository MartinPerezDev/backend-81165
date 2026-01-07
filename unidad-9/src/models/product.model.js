import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 500
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      required: true,
      enum: ["auriculares", "teclados", "mouse"]
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "product.jpg"
    }
  },
  {timestamps: true}
);

//INDICES
productSchema.index({ title: 1 }, { unique: true });

productSchema.index({ description: "text" });

productSchema.index({ code: 1 }, { unique: true });

productSchema.index({ price: 1 });

productSchema.index({ category: 1 });

//PLUGINS
productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

export default Product;