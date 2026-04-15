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
         const index = filterStatus.findIndex(item => item.status =="");
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
        keyword =req.query.keyword;
        const regex = new RegExp(keyword ,"i");
        // sử dụng công cụ regex để hiểu rằng đây là một string ng dùng 
        // i ở đây không phân biệt chữ hoa chữ thường
        
        find.title = regex;
    }
    // phân trang 
    let  objectPagination = {
        currentPage : 1,
        limitedItems : 4,
        totalpage : 1,
    };
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitedItems;
    const products = await Product.find(find).skip(objectPagination.skip).limit(objectPagination.limitedItems);
    const countProducts = await Product.countDocuments(find);
    console.log(countProducts);
    const totalPage = Math.ceil(countProducts / objectPagination.limitedItems);
    objectPagination.totalpage = totalPage;
    console.log(totalPage);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword : keyword,
        pagination: objectPagination
    });
};

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id: id}, {status: status});
    res.redirect("back");
};

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",").map(id => id.trim());
    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            break;
        default:
            break;
    }
    res.redirect("back");   
};