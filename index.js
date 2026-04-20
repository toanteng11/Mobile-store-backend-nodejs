const express = require('express'); // khai bao express
const bodyParser = require('body-parser'); // khai bao body parser để lấy dữ liệu từ form
const route = require('./routes/client/index.route'); //  khai báo router 
const multer = require('multer'); // khai báo multer để upload file
const adminroute = require('./routes/admin/index.route');
const cookieParser = require('cookie-parser'); // khai báo cookie parser để sử dụng được flash message trong ứng dụng
const session = require('express-session'); // khai báo express session để sử dụng được flash message trong ứng dụng
const flash = require('connect-flash'); // khai báo connect flash để sử dụng được flash message
const methodOverride = require('method-override'); // khai báo method override để sử dụng được các phương thức put, patch, delete trong form
require('dotenv').config(); // khai báo env để bảo mật thông tin dữ liệu  env
const port = process.env.PORT; // khai báo và sử dụng tk env
const database = require("./config/database"); // kết noi với file databese để gọi lam connect
database.connect(); // gọi làm hàm connect ở trong file database.js để khởi tạo kết nối
const systemConfig = require("./config/system")


app.use(express.static("public"));// để thư mục public lên giao diện tĩnh 
const app = express(); // khai bao  express 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
 // sử dụng method override để có thể sử dụng được các phương thức put, patch, delete trong form
app.set("views" , "./views"); // khai báo pug 
app.set("view engine" , "pug"); // khai báo pug

//flash
app.use(flash()); // sử dụng connect flash để có thể sử dụng được flash message trong ứng dụng
app.use(express.cookieParser(TranDucToan)); // sử dụng cookie parser để có thể sử dụng được flash message trong ứng dụng
app.use(express.session({ cookie: { maxAge: 60000 } })); // sử dụng session để có thể sử dụng được flash message trong ứng dụng
// middleware để truyền flash message vào res.locals để có thể sử dụng được trong tất cả các view
// route 
route(app);
adminroute(app);
// route admin

app.locals.prefixAdmin = systemConfig.prefixAmin;// tạo ra biến toàn cục sử dụng full chương trình 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
