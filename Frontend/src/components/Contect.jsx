import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
const Contact = () => {
  const [sendData, setSendData]=useState({
    name:"",
    email:"",
    subject:"",
    message:""
  })
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setSendData((pre)=>({...pre,[name]:value}))
  }
  const handleSubmit= async(e)=>{
    e.preventDefault()

    try{
       const response = await fetch(``)
    }catch{

    }
  }
  return (
    <>
      <div>
        <div>
          <Navbar/>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-20">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-pink-500 mb-8">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md border dark:border-slate-700">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-800 dark:text-white"
                  placeholder="e.g., Suraj BAli Sahu"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-800 dark:text-white"
                  placeholder="Your email"
                  name="email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-800 dark:text-white"
                  placeholder="What would you like to talk about?"
                  name="subject"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-800 dark:text-white"
                  placeholder="Write your message here..."
                  name="message"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="bg-gray-100 dark:bg-slate-800 p-8 rounded-xl shadow-md border dark:border-slate-700 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions, suggestions, or issues, feel free to
                reach out to us. We are always here to help you.
              </p>

              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  📧 Email:{" "}
                  <a
                    href="mailto:support@pustakmitra.com"
                    className="text-pink-500"
                  >
                    sahusurajbali@gmail.com
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  📞 Phone:{" "}
                  <span className="text-pink-500">+91 6260755443</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  📍 Address: 3rd Floor, Sindhi Colony , Indore, Madhya Pradesh,
                  India, 452001.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
