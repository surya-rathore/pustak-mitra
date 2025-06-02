import express from "express";
import { upload } from "../middleware/upload.js";
import { getBook, postBook } from "../controller/book.controller.js";

const router = express.Router();

// in your route
router.post('/upload', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), postBook);


router.get("/getBook", getBook);
// router.post("/postBook",postBook)


export default router;