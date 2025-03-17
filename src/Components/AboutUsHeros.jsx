import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/FetchLangData";

const AboutUsHeros = () => {
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
    <div>{ console.log(items[5])}
      {!items[5]?<div></div>:
        <div className="flex-col sm:flex-col flex lg:flex-row items-center justify-between w-100 mx-20 mb-20 pt-40 gap-40 ">
          <div className="w-[80%] ">
            <h1 className="text-6xl mb-10 text-center text-[#d9f154]">
              {items[5][Lang].About[0]}
            </h1>
            <p className="">
        {items[5][Lang].About[1]}
            </p>
          </div>
          <div>
            <img
              className="w-[350px]"
              src="https://media.tenor.com/hX4vmCCXnwoAAAAj/static-tv-no-background.gif"
            />
          </div>
        </div>
      }
    </div>
  );
};

export default AboutUsHeros;