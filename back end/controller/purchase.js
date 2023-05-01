const Razorpay = require('razorpay');
const Order = require('../model/orders');
const User = require('../model/users');
require('dotenv').config();

exports.purchasePremium = async (req, res, next) => {
    try{
        var rzp = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
        })

        const amount = 2500;

        rzp.orders.create({amount , currency : 'INR'}, (err, order) =>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            
            req.user.createOrder({orderId : order.id, status : 'PENDING'})
            .then(() => {
                return res.status(201).json({order, key_id : rzp.key_id});
            })
            .catch(err => {
                throw new Error(err);
            })
        })
    }
    catch(err){
        console.log(err);
        return res.status(403).json({message : 'Something went wrong', error : err});
    }
};

exports.updateTxnStatus = async (req, res) => {
    
    try {
        const {order_id, payment_id} = req.body;

        const order = await Order.findOne({where: {orderId: order_id}});

        order.update({paymentId: payment_id, status: 'SUCCESSFUL'})
            .then(() => {
                req.user.update({isPremium: true});
            })
            .then(() => {
                return res.status(202).json({success: true, message: 'transaction successful'});
            })
            .catch(err => {
                throw new Error(err);
            });
        
    } catch (error) {
        console.log(error);
        res.status(403).json({success: false, message: 'something went wrong', err: error});
    }
};