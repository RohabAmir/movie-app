import React from "react";
import './Loader.css';

const Loader = () => {
  const generateSquares = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className="square"></div>
    ));
  };
  return <div className="loader">{generateSquares(9)}</div>;
};

export default Loader;