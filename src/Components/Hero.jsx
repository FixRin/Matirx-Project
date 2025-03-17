import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
  headContentAnimation,
} from "../config/motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/FetchLangData";
import HtmlContent from "./HtmlContent";
const Hero = () => {
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
    <div>
      <AnimatePresence>
        {!items[3] ? (
          <div>loader...</div>
        ) : (
          <motion.section
            className="Home home-Up mt-20 "
            {...slideAnimation("left")}
          >
            <motion.div className="home-content" {...headContainerAnimation} style={{ paddingLeft: "4rem" }}>
              <motion.div
                {...headTextAnimation}
                
              >
                <h1 className={` ${theme==='dark'?'text-white text-9xl leading-[10rem]':'head-text'}`}>
                  <HtmlContent html={items[3][Lang].Hero[0]} />
                </h1>
              </motion.div>
              <motion.div
                {...headContentAnimation}
                className="flex flex-col gap-5"
              >
                <p className={`max-w-md font-normal text-gray-600 text-base ${theme==='dark'?'text-gray-200':''}`}>
                  <HtmlContent html={items[3][Lang].Hero[1]} />
                </p>
                <Link to="/customizer">
                  <button
                    style={{
                      height: "50px",

                      width: `${Lang === "AZ" ? "100px" : "85px"}`,
                      marginRight: "50px",
                      zIndex: "1",
                    }}
                    className=" font-bold text-sm    mx-5 button-cutout-green group   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    {items[3][Lang].Hero[2]}
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;