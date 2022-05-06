import React from "react";

function Footer({ text, links }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between sm:h-8 px-2 bg-purple-700 text-white">
      <p className="text-small sm:text-base mb-2 sm:mb-0">{text}</p>
      {links}
    </div>
  );
}

export default Footer;
