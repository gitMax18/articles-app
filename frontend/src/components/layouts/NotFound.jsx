import React from "react";

const NotFound = () => {
  return (
    <div className="relative bg-no-repeat bg-cover min-h-almost bg-connexion ">
      <div className="absolute text-4xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <p>Oups... cette page n'existe pas !</p>
        <br />
        <div className="text-center">404</div>
      </div>
    </div>
  );
};

export default NotFound;
