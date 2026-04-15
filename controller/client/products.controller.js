

// [GET] /products
const Product = require("../../model/product.model");// kết nối với tk model để lấy database ra 


module.exports.index= async (req, res) => {
  const products = await Product.find({ }); // in ra tất cả tk data ra màn hình bằng hàm find
  const newProducts = products.map( item => {
    item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0) ;// cách tính giá mới ở trong controller
    return item; 
  })
  res.render("pages/products" ,{
    pageTitle : " Trang danh sach san pham ",
    products: newProducts
  })
 
}