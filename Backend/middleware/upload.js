import multer from "multer";
import path from "path";

const uploadPath = "uploads/books";
// Set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/books");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files are allowed"), false);
  }
};


export const upload = multer({ storage, fileFilter });
