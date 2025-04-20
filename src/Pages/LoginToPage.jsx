import React from "react";
import '../Css/NotFound.css'
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="site bg-texture" >
      <div className="sketch" style={{marginTop:'5rem'}}>
        <div className="bee-sketch red" />
        <div className="bee-sketch blue" />
      </div>
      <h1>
        You can't be here !
        <small>Go to login</small>
        <Link to="/login">
        <button
        
                    style={{
                      height: "50px",
                      
                    
                    }}
                    className=" mt-5 mx-5 button-cutout-blue group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >Login</button></Link>
      </h1>
    </div>
  );
};

export default NotFound;