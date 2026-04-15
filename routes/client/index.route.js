const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

module.exports = (app) => {
  // route trang chủ
  app.use('/home', homeRoutes);
  app.use('/', homeRoutes);

  // route sản phẩm
  app.use('/products', productRoutes);
};
