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
                        "fields": {
                            "orderId": orderData.id,
                            "product": item.name,
                            "quantity": item.quantity,
                            "total": item.total,
                            "status": "Pending"
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