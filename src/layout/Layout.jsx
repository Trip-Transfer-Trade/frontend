import { Outlet } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex flex-col flex-grow pt-[6vh] pb-[10vh] w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
