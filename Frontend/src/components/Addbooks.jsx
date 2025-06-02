import React, { useState } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    image: null,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("image", formData.image);
    form.append("file", formData.file);
    try {
      const response = await fetch(`https://pustak-mitra-backend.onrender.com/book/upload`, {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      console.log(data);
      setFormData({
        name: "",
        title: "",
        price: "",
        category: "",
        image: null,
        file: null,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className=" w-128 flex justify-end items-start min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Book
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Image (Cover)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              File (Book PDF)
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
