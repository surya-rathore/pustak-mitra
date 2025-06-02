import express from "express";
import User from "../model/user.model.js";
import { signup, login, contact,order,verify,userCount,orderCount,allOrders} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/contact",contact);
router.post("/order",order);
router.post("/verify",verify);
router.get("/userCount",userCount);
router.get("/orderCount",orderCount);
router.get("/orders", allOrders);
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("books"); // or no populate if you only want IDs
    res.status(200).json({ books: user.books.map(book => book._id.toString()) });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;