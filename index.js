const express = require('express'); // khai bao express
const app = express(); // khai bao  express 
const route = require('./routes/client/index.route'); //  khai báo router 
const adminroute = require('./routes/admin/index.route');
require('dotenv').config(); // khai báo env để bảo mật thông tin dữ liệu  env
const port = process.env.PORT; // khai báo và sử dụng tk env
app.use(express.static("public"));// để thư mục public lên giao điện tĩnh 
const database = require("./config/database"); // kết noi với file databese để gọi lam connect
database.connect(); // gọi làm hàm connect ở trong file database.js để khởi tạo kết nối

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
