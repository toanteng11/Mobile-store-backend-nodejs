const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String, 
    status: String,
    position: Number,
    deleted: Boolean,

});
const product = mongoose.model('product', productSchema,"Products");// đối số thứ 3 là cái connection ở trong database

module.exports = product;