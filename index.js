const express = require('express'); // khai bao express
const bodyParser = require('body-parser'); // khai bao body parser để lấy dữ liệu từ form
const app = express(); // khai bao  express 
const route = require('./routes/client/index.route'); //  khai báo router 
const adminroute = require('./routes/admin/index.route');
const methodOverride = require('method-override'); // khai báo method override để sử dụng được các phương thức put, patch, delete trong form
require('dotenv').config(); // khai báo env để bảo mật thông tin dữ liệu  env
const port = process.env.PORT; // khai báo và sử dụng tk env
app.use(express.static("public"));// để thư mục public lên giao điện tĩnh 
const database = require("./config/database"); // kết noi với file databese để gọi lam connect
database.connect(); // gọi làm hàm connect ở trong file database.js để khởi tạo kết nối
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
 // sử dụng method override để có thể sử dụng được các phương thức put, patch, delete trong form
const systemConfig = require("./config/system")

app.set("views" , "./views"); // khai báo pug 
app.set("view engine" , "pug"); // khai báo pug

// route 
route(app);
adminroute(app);

app.locals.prefixAdmin = systemConfig.prefixAmin;// tạo ra biến toàn cục sử dụng full chương trình 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
