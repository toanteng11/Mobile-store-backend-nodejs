

// [GET] /products
const Product = require("../../model/product.model");// kết nối với tk model để lấy database ra 


module.exports.index= async (req, res) => {
  const products = await Product.find({ status: "active", deleted: false }).sort({ position: "desc"}); //- Lấy tất cả sản phẩm có trạng thái "active" và chưa bị xóa, sắp xếp theo vị trí giảm dần
  const newProducts = products.map( item => {
    item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0) ;// cách tính giá mới ở trong controller
    return item; 
  })
  res.render("pages/products" ,{
    pageTitle : " Trang danh sach san pham ",
    products: newProducts
  })
 
}