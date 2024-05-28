const lark = require('@larksuiteoapi/node-sdk');
const { G4F } = require("g4f");
const g4f = new G4F();

require('dotenv').config()
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
var api = new WooCommerceRestApi({
    url: 'https://daugoiecoex.infinityfreeapp.com',
    consumerKey: 'ck_aab60ca180bfbc19f4fb4e1d787def2db7fe91ec',
    consumerSecret: 'cs_7aa3d0eba573dea5a16a2ae68fd6effab443866e',
    version: "wc/v3"
  });
  
const client = new lark.Client({
	appId: 'cli_a6c413f70239902f',
	appSecret: 'N0XyxAslf1zLBR7RyTzhzduT5AsSZhhN',
});

let webhookOrderCreate = async (req, res) => {
    try {
        let webhookSecret = req.headers['x-webhook-secret'];
        console.log('secret:', webhookSecret);
        
        const orderData = req.body;
        console.log('orderData:', orderData);

        for (let item of orderData.line_items) {
            console.log('Processing line item:', item);
            console.log('orderId',orderData.id," + ", typeof(orderData.id))
            console.log('product',item.name," + ", typeof(item.name))
            console.log('total',item.total," + ", typeof(item.total))
            console.log('quantity',item.quantity," + ", typeof(item.quantity))
            console.log('price',item.price," + ", typeof(item.price))
            try {
                const response = await client.bitable.appTableRecord.create({
                    path: {
                        app_token: process.env.LARK_APP_TOKEN || "MBIBbaiqna1IK5sHHw1lW3OogHe",
                        table_id: process.env.LARK_TABLE_ID || "tbljSPzHsyjOJKXw",
                    },
                    data: {
                        fields: {
                            "orderId": orderData.id,
                            "product": item.name,
                            "quantity": item.quantity,
                            "total": item.total,
                            "status": "Processing",
                            "price": item.price
                        }
                    },
                }, lark.withUserAccessToken(process.env.AUTHORIZATION));

                console.log('Successfully created record:', response);
            } catch (err) {
                console.error('Error creating record for item:', item, 'Error:', err);
            }
        }

        res.status(200).json({ success: true, data: orderData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
let changeStatusOrder = async (req,res)=>{
    try {
        console.log("req query",req.query);
        const data = {
            status: req.query.status
          };
        let responseWooCommerce = await api.put(`orders/${req.query.orderId}`, data)
        res.status(200).json({ success: true, message: responseWooCommerce.data });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
}
var FB = require('fb');
FB.setAccessToken(process.env.FB_ACCESS_TOKEN);
let testLark = async (req, res) => {
    try {
        // const messages = [
        //     { role: "user", content: "Viết cho tôi một content về sản phẩm dầu gội thảo dược trắc bá diệp"}
        // ];
        // let a = await g4f.chatCompletion(messages)
        // return res.status(200).json({mess:a});
        var body = 'My first post using facebook-node-sdk';
        FB.api('me/photos', 'post', { url: "https://dranh.vn/wp-content/uploads/2023/07/dau-goi-thao-duoc-350ml-3.jpg", caption: 'My vacation' }, function (res) {
            if(!res || res.error) {
              console.log(!res ? 'error occurred' : res.error);
              return;
            }
            console.log('Post Id: ' + res.post_id);
          });
           
    } catch (error) {
        console.error(error.config);
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports={
    webhookOrderCreate,
    testLark,
    changeStatusOrder
}