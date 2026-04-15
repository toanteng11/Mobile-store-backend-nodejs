const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/products.controller");


router.get("/",controller.index);
router.patch("/change-status",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);

module.exports = router;
