import User from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import Payment from "../model/payment.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import razorpay from "razorpay";
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(name, email, subject, message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sahusurajbali@gmail.com",
      pass: "xhnm qfvd dyqh nafc",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: "sahusurajbali@gmail.com",
    subject: `New Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json("contact");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error sending email");
  }
};
export const order = (req, res) => {
  const { amount } = req.body;
  try {
    const option = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    razorpayInstance.orders.create(option, (error, order) => {
      if (error) {
        console.log("create order me eoor", error);
        return res.status(500).json({ message: "somthing went wrong" });
      }
      res.status(200).json({ data: order });
      console.log("data from the order", order);
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("order funtion error", error);
  }
};
export const verify = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    bookId,
    price,
  } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;
    if (isAuthentic) {
      const newpayment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        user: userId,
        book: bookId,
        price:price,
      });

      await newpayment.save();
      await User.findByIdAndUpdate(userId, {
        $addToSet: { books: bookId },
      });
      res.json({
        message: "payment sucessful",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log(error);
  }
};
export const userCount = async (req, res) => {
  try {
    const user = await User.find();
    console.log("user count", user.length);
    res.status(200).json(user);
  } catch (error) {
    console.log("usercount Controller error", error);
    res.status(500).json(error);
  }
};
export const orderCount = async (req, res) => {
  try {
    const order = await Payment.find();
    console.log("user count", order.length);
    res.status(200).json(order);
  } catch (error) {
    console.log("usercount Controller error", error);
    res.status(500).json(error);
  }
};
export const allOrders = async (req, res) => {
  try {
    const orders = await Payment.find()
      .populate("user", "fullname email")
      .populate("book", "name image price"); 

    res.status(200).json(orders);
  } catch (error) {
    console.log("Admin order fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

