import React from "react";
import {CircleLoader} from 'react-spinners'
const Loader = () => {
  const style = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return (
    <div className="bg-texture " style={style}>
      <CircleLoader color="#d9f154" size={500} speedMultiplier={0.5} />
    </div>
  );
};

export default Loader;