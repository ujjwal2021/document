const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name of the product"],
    },
    price: {
        type: Number,
        required: [true, "please provide price of the product"],
    },
    image: {
        type: String,
        required: [true, "please provide image of the product"],
    },
})

module.exports = mongoose.model("Product", ProductSchema);