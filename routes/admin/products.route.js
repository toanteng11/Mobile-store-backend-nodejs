const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/products.controller");
const multer = require("multer");
const storage = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() }); // Cấu hình multer để lưu trữ tệp vào thư mục "public/uploads/"
// const upload = multer({ dest: "public/uploads/" }); // Cấu hình multer để lưu trữ tệp vào thư mục "public/uploads/"



router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.get("/create",controller.create);
router.post("/create",upload.single("thumbnail"),controller.postCreate);
router.get("/edit/:id",controller.edit);
router.put("/edit/:id",upload.single("thumbnail"),controller.putEdit);
router.delete("/delete/:id",controller.delete);


module.exports = router;
