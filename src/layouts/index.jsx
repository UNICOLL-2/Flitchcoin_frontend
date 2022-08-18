import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="back">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Layout;
