import React from "react";

const appInfos = ({ value, txt }) => {
  return (
    <div className="transform rotate-45 bg-indigo-900 w-28 h-28">
      <span className="flex items-center justify-center h-full text-5xl text-white transform -rotate-45">
        {value}
      </span>
      <div className="relative text-lg font-bold transform -rotate-90 bottom-16 left-16 ">
        {txt}
      </div>
    </div>
  );
};

export default appInfos;
