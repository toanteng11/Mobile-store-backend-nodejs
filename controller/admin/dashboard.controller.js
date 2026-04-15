
 
 // [GET] http://localhost:3000/admin/dashboard
 
 
 module.exports.dashboard = (req, res) => { 
    res.render("admin/pages/dashboard/index",{
        pageTitle: "Trang tong quang"
    } )
};  