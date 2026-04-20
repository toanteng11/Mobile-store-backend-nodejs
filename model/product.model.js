const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String, 
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    
},{
    timestamps: true
});
const product = mongoose.model('product', productSchema,"Products");// đối số thứ 3 là cái connection ở trong database

module.exports = product;