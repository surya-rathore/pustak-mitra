import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

function Home() {
  const [filterbook, setFilterbook] = useState("");
  return (
    <>
      <Navbar setFilterbook={setFilterbook}/>
      <Banner />
      <Freebook filterbook={filterbook} />
      <Footer />
    </>
  );
}

export default Home;
