import React from "react";
import '../Css/NotFound.css'
const NotFound = () => {
  return (
    <div className="site bg-texture" >
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