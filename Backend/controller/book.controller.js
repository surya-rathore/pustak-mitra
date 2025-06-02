import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        console.log("books getBook controller se ",book.length)
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const postBook = async (req, res) => {
  try {
    const { name, price, category, title } = req.body;

    const imageFile = req.files?.image?.[0];
    const bookFile = req.files?.file?.[0];

    const newBook = new Book({
      name,
      price,
      category,
      title,
      image: imageFile ? `/uploads/books/${imageFile.filename}` : "",
      filePath: bookFile ? `/uploads/books/${bookFile.filename}` : "",
    });

    await newBook.save();
    res.status(201).json({ message: "Book uploaded successfully", book: newBook });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
