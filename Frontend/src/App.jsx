import React, { useState } from "react";
import Home from "./home/Home";
import About from "./components/About"
import Addbooks from "./components/Addbooks";
import Contact from "./components/Contect";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Admin_dashboard from "./components/admin_dashboard";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log("user who logedin",authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses/> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addbooks" element={<Addbooks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Admin_dashboard />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
