const lark = require('@larksuiteoapi/node-sdk');
require('dotenv').config()

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
            console.log('loop',item);
            await client.bitable.appTableRecord.create({
                path: {
                    app_token: "MBIBbaiqna1IK5sHHw1lW3OogHe",
                    table_id: "tbljSPzHsyjOJKXw",
                },
                data: {
                    "fields": {
                        "orderId": orderData.id,
                        "product": item.name,
                        "quantity": item.quantity,
                        "total": item.total,
                        "status": "Pending"
                    }
                },
            },
            lark.withUserAccessToken(process.env.AUTHORIZATION));
        }

        res.status(200).json({ success: true, data: orderData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
let testLark = (req,res) => {
    try {
        console.log('abc')

    } catch (error) {
        res.status(500).json({ success: false, message: error });

    }
}
module.exports={
    webhookOrderCreate,
    testLark
}