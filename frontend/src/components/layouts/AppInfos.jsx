import React from "react";

const appInfos = ({ value, txt }) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="transform rotate-45 bg-indigo-900 w-28 h-28">
        <span className="flex items-center justify-center h-full text-5xl text-white transform -rotate-45">
          {value}
        </span>
      </div>
      <div className="text-lg font-bold">{txt}</div>
    </div>
  );
};

export default appInfos;
