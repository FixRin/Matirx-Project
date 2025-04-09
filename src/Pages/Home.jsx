import React, { useEffect } from "react";
import Hero from "../Components/Hero";
import Index from "../../Canvas";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import NewsLetter from "../Components/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/FetchLangData";

/*hero hissseine bol a aydin */


const Home = () => {

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
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div>
      {!items?<div>fsdfsdf</div>:
      <div
        className={`${
          theme === "dark" ? "bg-texture bg-gray-900 text-white" : "bg-texture"
        }`}
      >
        <div>
          <main className="mb-20  transition-all-ease-in  h-100  pt-10 ">
            <Hero />

            <Index />
          </main>
          <Products />
        </div>
        <div>
          <Slider />
        </div>

        <NewsLetter />
      </div>
      }
    </div>
  );
};

export default Home;
