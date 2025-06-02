import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    }
  ],
});
const User = mongoose.model("User", userSchema);
export default User;