import React from "react";

function Button({ title, onClick, classes }) {
  const appliedClasses = "bg-purple-800 text-white rounded py-1 px-4 uppercase shadow-sm shadow-purple-800 active:scale-95 hover:bg-purple-900 " + classes;
  return (
    <button className={appliedClasses} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
