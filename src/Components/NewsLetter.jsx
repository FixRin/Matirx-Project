import React, { useEffect } from "react";
import { fetchData } from "../Redux/FetchLangData";
import { useDispatch, useSelector } from "react-redux";

const NewsLetter = () => {
  const theme = useSelector((state) => state.theme.mode);
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
    <div className="font-sans mt-10 w-full h-full flex justify-center items-center">
      {!items[2] ? (
        <div></div>
      ) : (
        <div className="w-[640px] mx-5 mt-10">
          <h1 className="text-center text-5xl font-bold font-serif">
            {items[2][Lang].Newsletter[0]}
          </h1>
          <p className="text-center mt-2">{items[2][Lang].Newsletter[1]}</p>
          <form method="post" className="relative flex items-center my-10">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              className={`w-full ${theme==='dark'?'bg-white text-black ':'bg-transparent'} py-3 pl-5 pr-20 border-2 border-solid border-black rounded-0 outline-none placeholder:text-black/50`}
              required
            />
            <button
              type="submit"
              className={`button button--pen ${
                Lang === "AZ" ? "min-w-[210px]" : ""
              }`}
            >
              <div className="button__wrapper">
                <span className="button__text">
                  {items[2][Lang].Newsletter[2]}
                </span>
              </div>
              <div className="characterBox">
                <div className="character wakeup">
                  <div className="character__face" />
                  <div className="charactor__face2" />
                </div>
                <div className="character wakeup">
                  <div className="character__face" />
                  <div className="charactor__face2" />
                </div>
                <div className="character">
                  <div className="character__face" />
                  <div className="charactor__face2" />
                </div>
              </div>
            </button>
          </form>
          <p className="text-center">{items[2][Lang].Newsletter[3]}</p>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;