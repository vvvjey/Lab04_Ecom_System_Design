const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const WooCommerce = new WooCommerceRestApi({
    url: 'https://daugoiecoex.infinityfreeapp.com',
    consumerKey: 'ck_aab60ca180bfbc19f4fb4e1d787def2db7fe91ec',
    consumerSecret: 'cs_7aa3d0eba573dea5a16a2ae68fd6effab443866e',
    version: 'wc/v3'
  });

let renderHome = async(req,res)=>{
    let data = await getAllProductFromWoo();
    res.render("home",{data:data})
}

let getAllProductFromWoo  = async(req,res) => {
    try {
        const response = await WooCommerce.get("products");
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw error; 
    }
}
let createNewProductFromWoo = async(req,res)=>{
    console.log('data',req.body)
    let data = {
        name: req.body.name,
        type: "simple",
        regular_price:req.body.price,
        description: req.body.description,
        short_description: req.body.short_description,
        stock_quantity:req.body.stock_quantity,
        manage_stock: true,
        categories: [
          {
            id: req.body.categories
          }
        ],
        images: [
          {
            src:req.body.img_src
          },
        ]
    };
    await WooCommerce.post("products", data)
    .then((response) => {
        console.log(response);
        res.json({
            errCode:0,
            errMessage:"Create successfully"
        })
    })
    .catch((error) => {
        console.log(error.response.data.message)
        res.json({
            errCode:1,
            errMessage:error.response.data.message
        })
    });
}
let getProductDetail = async(req,res)=>{
    try {
        WooCommerce.get(`products/${req.query.id}`)
        .then((response) => {
            return res.json({
                errCode:0,
                data:response.data
            })
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    } catch (error) {
        console.log(error.response.data);
        throw error; 
    }
}
let updateProduct = async(req,res)=>{
    try {
        console.log(req.body)
        let data = {
            name: req.body.name,
            regular_price:req.body.price,
            description: req.body.description,
            short_description: req.body.short_description,
            stock_quantity:req.body.stock_quantity,
            categories: [
              {
                id: 2
              }
            ],
            images: [
              {
                src:req.body.img_src
              },
            ]
        };
        await WooCommerce.put(`products/${req.body.id}`, data)
        .then((response) => {
            console.log(response.data);
            res.json({
                errCode:0,
                errMessage:"Update successfully"
            })
        })
        .catch((error) => {
            console.log('error update',error.response.data);
            res.json({
                errCode:1,
                errMessage:error.response.data.message
            })
        });
    } catch (error) {
        console.log(error.response.data);
        throw error; 
    }
}
let deleteProduct = async(req,res)=>{
    try {
        await WooCommerce.delete(`products/${req.body.id}`, {
            force: true
          })
            .then((response) => {
              console.log(response.data);
              res.json({
                errCode:0,
                errMessage:"Update successfully"
            })
            })
            .catch((error) => {
              console.log(error.response.data);
              res.json({
                errCode:1,
                errMessage:error.response.data.message
            })
            });
    } catch (error) {
        console.log(error.response.data);
        throw error; 
    }
}
module.exports={
    renderHome,
    getAllProductFromWoo,
    createNewProductFromWoo,
    getProductDetail,
    updateProduct,
    deleteProduct
}