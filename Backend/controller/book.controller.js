import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const postBook= async(req,res)=>{
    try{
       const {name, price, category, image, title}=req.body;
       const newBook= new Book({name,price,category,image,title})
       await newBook.save()
    }
    catch(error){
        console.log("Error: ",error);
        res.status(500).json(error)
    }
};
export const searchBook =async(req,res)=>{
    const {inputSearch}=req.body;
    console.log(inputSearch)
    const result= await Book.find({name:inputSearch})
    console.log(result)
    res.status(200).json({result})
    
}