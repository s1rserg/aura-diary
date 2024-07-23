import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../header/Header";
import Footer from "../../../footer/Footer";

interface LayoutProps {
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ userName }) => (
  <>
    <Header userName={userName} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
