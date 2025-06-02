import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Course from "../components/Course";
import Footer from "../components/Footer";
function Courses() {
  const [filterbook, setFilterbook] = useState("");
  return (
    <>
      <Navbar setFilterbook={setFilterbook} />
      <div className=" min-h-screen">
        <Course filterbook={filterbook} />
      </div>
      <Footer />
    </>
  );
}

export default Courses;
