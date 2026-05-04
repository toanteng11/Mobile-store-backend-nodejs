const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/products.controller");
const multer = require("multer");
const storage = require("../../helper/storageMulter");


// Cấu hình Cloudinary với thông tin từ biến môi trường

const upload = multer(); // Cấu hình multer để lưu trữ tệp vào thư mục "public/uploads/"
// const upload = multer({ dest: "public/uploads/" }); // Cấu hình multer để lưu trữ tệp vào thư mục "public/uploads/"

const { uploadCloud } = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), upload.uploadCloud, controller.postCreate);
router.get("/edit/:id", controller.edit);
router.put("/edit/:id", upload.single("thumbnail"), upload.uploadCloud, controller.putEdit);
router.delete("/delete/:id", controller.delete);
router.delete("/delete-multi", controller.deleteMulti);
router.get("/search", controller.search);
router.get("/filter", controller.filter);
router.patch("/edit/:id", upload.single("thumbnail"), upload.uploadCloud, controller.patchEdit);


module.exports = router;
