const Product = require("../../model/product.model");
//[GET] admin/products


module.exports.index = async (req, res) => {

    let filterStatus = [
        {
            name: "Tất cả ",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        },

    ];
    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";

    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }


    // từ đầy ta lấy ra data của sản phẩm 
    // console.log(req.query.status);
    let find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    let keyword = "";

    if (req.query.keyword) {
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        // sử dụng công cụ regex để hiểu rằng đây là một string ng dùng 
        // i ở đây không phân biệt chữ hoa chữ thường

        find.title = regex;
    }
    //sort
    let sort ={};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else
    {
        sort = { position: "desc" };
    }

    //sort 

    // phân trang 
    let objectPagination = {
        currentPage: 1,
        limitedItems: 4,
        totalpage: 1,
    };
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitedItems;
    const products = await Product.find(find).sort({sort}).skip(objectPagination.skip).limit(objectPagination.limitedItems);
    const countProducts = await Product.countDocuments(find);
    console.log(countProducts);
    const totalPage = Math.ceil(countProducts / objectPagination.limitedItems);
    objectPagination.totalpage = totalPage;
    console.log(totalPage);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword,
        pagination: objectPagination
    });
};

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect("back");
};

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",").map(id => id.trim());
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", "Cập nhật trạng thái thành công");
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", "Cập nhật trạng thái thành công");
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
            req.flash("success", "Xóa tất cả sản phẩm thành công");
            break;
        case "delete-selected":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
            req.flash("success", "Xóa sản phẩm thành công");
            break;
        case "change-position":
            for(const item of ids){
                let [id, position] = item.split("-"); //- Tách id và vị trí từ chuỗi "id-position"
                id = id.trim(); //- Loại bỏ khoảng trắng thừa
                position = parseInt(position.trim()); //- Chuyển vị trí thành số nguyên
                await Product.updateOne({ _id: id }, { position: position }); //- Cập nhật vị trí cho sản phẩm có id tương ứng
            }
            break;
        default:
            break;
    }
    res.redirect("back");
};

module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Trang tạo mới sản phẩm"
    });
};

module.exports.postCreate = async (req, res) => {
    const data = req.body;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.file) {
        req.body.thumbnail = "/uploads/" + req.file.filename;
    }
    if(req.body.position== ""){
        const countProducts = await Product.count();
        req.body.position = countProducts + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    
    req.flash("success", "Tạo mới sản phẩm thành công");
    res.redirect("/admin/products");
};
module.exports.index = async (req, res) => {
    const products = await Product.find({ deleted: false }).sort({ price: "desc" }).status({ status: "active" });
    const newProducts = products.map(product => {
       product.priceNew = product.price - (product.price * product.discountPercentage) / 100;
       return product.tofixed(0);
    });

    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sach san pham",
        products: newProducts
    });
}

