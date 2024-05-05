const express = require("express");
const productController = require('../controllers/productController');
let router=express.Router();
let initWebRoutes = (app) => {

    router.get('/',productController.renderHome);

    // Api
    router.get('/api/v1/get-all-products',productController.getAllProductFromWoo);
    router.get('/api/v1/get-product-detail-by-id',productController.getProductDetail);
    router.post('/api/v1/create-new-product',productController.createNewProductFromWoo);
    router.put('/api/v1/update-product',productController.updateProduct);
    router.delete('/api/v1/delete-product',productController.deleteProduct);

    return app.use("/",router)
}


module.exports=  initWebRoutes;