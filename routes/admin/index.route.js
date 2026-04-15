const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
module.exports = (app) => {

  const PATH_ADMIN = systemConfig.prefixAmin;
  app.use( PATH_ADMIN + "/dashboard" ,dashboardRoutes);
  app.use( PATH_ADMIN ,dashboardRoutes);
  app.use( PATH_ADMIN + "/products" , productsRoutes);
};
