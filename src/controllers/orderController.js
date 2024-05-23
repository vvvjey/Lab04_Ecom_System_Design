let webhookOrderCreate = (req,res) =>{
    try {
        let a= req.headers['x-webhook-secret'];
        console.log('secret : ',a);
        const orderData = req.body;
        console.log('orderdata' , orderData);
        res.status(200).json({ success: true, data: orderData });
    
    } catch (error) {
        res.status(500).json({ success: false, message: error });

    }

}
module.exports={
    webhookOrderCreate
}