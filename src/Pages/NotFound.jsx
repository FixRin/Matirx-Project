import React from "react";
import '../Css/NotFound.css'
import { useSelector } from "react-redux";
const NotFound = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className={`${
      theme === "dark" ? "bg-texture bg-gray-900 text-white" : "bg-texture"
    } site`}>
      <div className="sketch" style={{marginTop:'5rem'}}>
        <div className="bee-sketch red" />
        <div className="bee-sketch blue" />
      </div>
      <h1>
        404:
        <small>Page Not Found</small>
      </h1>
    </div>
  );
};

export default NotFound;