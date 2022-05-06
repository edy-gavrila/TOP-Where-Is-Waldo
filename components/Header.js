import React from "react";
import Image from "next/image";
function Header({ title, icon, menu }) {
  return (
    <div className="flex items-center w-full bg-purple-700 text-white h-12 px-2 shadow-md shadow-purple-500">
      <div className="flex mr-4">
        <Image src={icon} height="40" width="40" alt="" layout="fixed" />
      </div>
      <h1 className="text-2xl mr-4">{title}</h1>
      <div>{menu}</div>
    </div>
  );
}

export default Header;