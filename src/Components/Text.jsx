import React, { useEffect } from "react";
import { fetchData } from "../Redux/FetchLangData";
import { useDispatch, useSelector } from "react-redux";

const Text = () => {
  const Lang = useSelector((state) => state.lang.mode);
  const { items, status, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
   
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  return (
    
    <div>
        
      {!items[3]? (
        <div></div>
      ) : (
        <div>
          {" "}
          <div>
            <h2 className="font-sans uppercase text-7xl text-center mb-4">
              {items[4][Lang].ProductSlider[0]}
            </h2>
          </div>
          <div>
            <div className="text-center mb-6 text-xl">
              <p>{items[4][Lang].ProductSlider[1]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Text;