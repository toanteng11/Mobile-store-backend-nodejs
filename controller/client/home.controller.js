
// [GET] / home
 module.exports.index  = (req, res) => { 
    res.render("pages/home" , {
        pageTitle : "Trang chu"
  } );
    
};