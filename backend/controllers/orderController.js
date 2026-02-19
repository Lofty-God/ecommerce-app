import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
import Stripe from 'stripe';
import razorpay from 'razorpay';


// global variables
const currency = 'USD';
const deliveryCharge = 10;

// gateway initialised
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


// place order using COD Method
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()

        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// place order by stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity

        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1

        })
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
// verify stripe 
const verifyStripe = async (req, res) => {
    const { userId, success, orderId } = req.body
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// place order by Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()

        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const options = {
            currency: 'usd',
            amount: amount * 100,
            receipt: newOrder._id.toString()
        }
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })

        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}
// verify razorpay
const verifyRazorpay = async(req,res)=>{
    try {
        const{userId, razorpay_order_Id }= req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_Id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true, message:'Payment Successful'});
        }else{
            res.json({success:false, message:"Payment failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
        
    }

}


// Place order with Paystack
export const placeOrderPaystack = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Paystack",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Return order data so frontend can call initPaystack
    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Paystack payment
export const verifyPaystack = async (req, res) => {
  const { reference, userId } = req.body;
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      // Mark order as paid
      await orderModel.findByIdAndUpdate(response.data.data.metadata.orderId, {
        payment: true,
      });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Payment Successful" });
    } else {
      return res.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })


    } catch (error) {
        console.log(error)
        res.json({ success: true, message: error.message })
    }

}

// user orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// update order status for admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'status updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };