import mongoose from "mongoose"

const paymentSchema = mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  price:{
    type:String
},
});

const Payment=  mongoose.model("Payment",paymentSchema)
export default Payment;