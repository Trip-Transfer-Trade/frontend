import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Layout() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <Outlet />
      </div>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
}