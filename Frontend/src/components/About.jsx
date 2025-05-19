import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 min-h-screen pt-20 pb-10 px-6 md:px-20 transition-colors duration-300">
        <div>
          <Navbar />
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-pink-500">PustakMitra</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Your trusted partner in discovering the joy of reading and lifelong learning.
          </p>
        </div>

        {/* Section 1: Our Story */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-20">
          <div className="md:w-1/2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/613/173/non_2x/happy-kids-read-book-and-study-together-vector.jpg"
              alt="Our Story"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300">
              PustakMitra was born from a simple idea — to make books more accessible, enjoyable, and meaningful for everyone. Whether you're a bookworm, a student, or just starting your reading journey, we offer a diverse platform to explore knowledge and imagination.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              With a growing collection of books, recommendations, and tools to keep you inspired, we're here to be your friend in the world of books — your "Mitra" in reading.
            </p>
          </div>
        </div>

        {/* Section 2: Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-pink-100 dark:bg-pink-900 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold text-pink-600 dark:text-pink-300 mb-4">📌 Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-200">
              To build a world where learning is a daily habit, where books are not just resources — but companions, guiding minds toward curiosity, creativity, and confidence.
            </p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold text-yellow-600 dark:text-yellow-300 mb-4">🎯 Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-200">
              Empower readers with tools, content, and community that encourages lifelong learning. From casual readers to academic enthusiasts, our mission is to support everyone’s journey with books.
            </p>
          </div>
        </div>

        {/* Section 3: What Makes Us Different */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            💡 What Makes Us Unique?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-pink-500">Curated Books</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Handpicked titles from every genre to match your interest.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-yellow-500">Daily Recommendations</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Fresh reads daily to keep your curiosity alive.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-green-500">Friendly UI</h4>
              <p className="text-gray-600 dark:text-gray-300">
                A smooth, reader-first experience across all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Join Us */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 dark:from-pink-500 dark:to-pink-700 text-white rounded-xl p-10 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to turn a new page?</h2>
          <p className="text-lg mb-6">
            Join PustakMitra today and begin your journey with stories, knowledge, and inspiration.
          </p>
          <button className="bg-white text-pink-600 font-bold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
