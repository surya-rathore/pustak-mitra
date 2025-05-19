import express from "express";
import { getBook, postBook, searchBook  } from "../controller/book.controller.js";

const router = express.Router();

router.get("/getBook", getBook);
router.post("/postBook",postBook)
router.get("/searchBook",searchBook)

export default router;