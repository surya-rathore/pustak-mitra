import User from "../model/user.model.js";
import nodemailer from 'nodemailer'
import bcrypt from "bcrypt";
export const signup = async(req, res) => {
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
export const login = async(req, res) => {
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
  const { name,email,subject,message } = req.body;


  console.log(name,email,subject,message)

  const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
          user: 'sahusurajbali@gmail.com',
          pass: 'xhnm qfvd dyqh nafc'
        },
      tls: {
        rejectUnauthorized: false, 
    },
  });

  const mailOptions = {
    from: email,
    to: 'sahusurajbali@gmail.com',
    subject: `New Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.status(200).json("contact");
  } catch (error) {
      console.error(error);
      res.status(500).json('Error sending email');
  }
}