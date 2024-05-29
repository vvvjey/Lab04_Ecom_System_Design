const lark = require('@larksuiteoapi/node-sdk');

let handleCF7ToLarkSuite = async(req,res)=>{
    try {
        console.log('req.body',req.body);
        const response = await client.bitable.appTableRecord.create({
            path: {
                app_token: process.env.LARK_APP_TOKEN || "MBIBbaiqna1IK5sHHw1lW3OogHe",
                table_id: process.env.LARK_TABLE_ID || "tbljSPzHsyjOJKXw",
            },
            data: {
                fields: {
                    "message": req.body.message,
                    "name": req.body.name,
                    "phoneNumber": req.body.phoneNumber
                }
            },
        }, lark.withUserAccessToken(process.env.AUTHORIZATION));
        console.log('Successfully created record:', response);
        return res.status(200).json({mess:"success",response})
    } catch (error) {
        console.error('Error creating record for item:', item, 'Error:', err);
        
    }
}
module.exports = {
    handleCF7ToLarkSuite
}