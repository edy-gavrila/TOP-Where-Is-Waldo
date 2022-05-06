import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FooterLinks from "./UI/FooterLinks";

import headerLogo from "../assets/img/header-logo.png";

function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-purple-500">
      <Header title = "Where's that thing?" icon={headerLogo} menu=""/>
      <div className="container grow">{children}</div>
      <Footer text = "Copyright &copy;2021 Eduard Gavrila" links={<FooterLinks />} />
    </div>
  );
}

export default SiteLayout;
