import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogData } from "../Redux/TrendingBlog";
import Loader from "../Components/Loader";
const Blog = () => {
  const [latestBlog, setLatestBlog] = useState([]);
  const theme = useSelector((state) => state.theme.mode);
  const Lang = useSelector((state) => state.lang.mode);
  const { blogItems, status, error } = useSelector((state) => state.BlogData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogData());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  useEffect(() => {
    if (status === "succeeded") {
      setLatestBlog(() => blogItems[3][Lang].Blog);
    }
  }, [status, Lang]);

  return (
    <div
      className={` ${
        theme === "dark"
          ? "bg-texture bg-black text-white pt-20 "
          : "bg-texture pt-20"
      }`}
    >
      {!blogItems[0] ? (
        <div className="pb-80 ">
          <Loader />
        </div>
      ) : (
        <div className=" min-h-screen">
          <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-4">
            <h2 className="border-b-2 border-yellow-600 mb-4">
              <span className="bg-yellow-600 px-2 py-1 text-white uppercase tracking-wide">
                Trending
              </span>
            </h2>
            <div className="flex flex-col flex-wrap md:flex-row md:-mx-2">
              {blogItems.map((blogitems, index) => (
                <div
                  className="w-full md:w-1/2 lg:w-1/4 mb-4 lg:mb-0"
                  key={index}
                >
                  <Link
                    to="/blogdetails"
                    className="h-72 md:h-96 block group relative md:mx-2 overflow-hidden"
                  >
                    <img
                      src={blogItems[1].imgSrc.image[index]}
                      className="absolute z-0 object-cover w-full h-72 md:h-96 transform group-hover:scale-150"
                    />
                    <div className="absolute gradient transition duration-300 group-hover:bg-black group-hover:opacity-90 w-full h-72 md:h-96 z-10" />
                    <div className="absolute left-0 right-0 bottom-0 p-6 z-30 transform translate-y-1/2 transition duration-300 h-full group-hover:translate-y-0 delay-100">
                      <div className="h-1/2 relative">
                        <div className="absolute bottom-0">
                          <h2 className="font-bold text-white leading-tight transition duration-300 text-xl pb-6 group-hover:underline">
                            {blogItems[1][Lang].Blog[index][0]}
                          </h2>
                        </div>
                      </div>
                      <div className="h-1/2">
                        <p className="text-white  opacity-0 transition duration-300 group-hover:opacity-100">
                          {blogItems[1][Lang].Blog[index][1]}
                        </p>
                        <button className="bg-white text-black text-sm px-3 my-2 py-1 font-semibold opacity-0 transition duration-300 group-hover:opacity-100 border-2 border-white focus:border-black focus:bg-gray-300">
                          {blogItems[1][Lang].Blog[index][2]}
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col flex-wrap md:flex-row md:-mx-4 my-8">
              <div className="w-full md:w-2/3 mb-4 lg:mb-0">
                <div className="md:mx-4">
                  <h2 className="border-b-2 border-red-600 mb-4">
                    <span className="bg-red-600 px-2 py-1 text-white uppercase tracking-wide">
                      {blogItems[3][Lang].Title[0]}
                    </span>
                  </h2>
                  {latestBlog.map((latestBlogItems, index) => (
                    <div className="flex flex-wrap items-center md:-mx-2">
                      <div className="w-full md:w-3/12">
                        <div className="md:mx-2">
                          <img
                            src={blogItems[3].imgSrc.image[index]}
                            className="w-full mb-4 md:mb-0"
                          />
                        </div>
                      </div>
                      <div className="md:w-9/12">
                        <div className="md:mx-2">
                          <h2 className=" font-bold text-2xl pb-4 leading-tight">
                            <a href="#" className=" hover:underline">
                              {latestBlog[index][0]}
                            </a>
                          </h2>
                          <p className="text-black-400 pb-2">
                            {" "}
                            {latestBlog[index][1]}
                          </p>
                          <div className="text-black-200 inline-block py-1 italic text-sm">
                            {latestBlog[index][2]}
                          </div>
                        </div>
                      </div>
                      <div className="w-full mb-5 pb-5 border-b border-gray-700 md:mx-2" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 mb-4 lg:mb-0">
                <div className="md:mx-4">
                  <h2 className="border-b-2 border-indigo-600 mb-4">
                    <span className="bg-indigo-600 px-2 py-1 text-white uppercase tracking-wide">
                      {blogItems[2][Lang].Blog[0]}
                    </span>
                  </h2>
                  <img
                    src={blogItems[2].imgSrc.image[0]}
                    className="w-full mb-4"
                  />
                  <h2 className=" font-bold text-2xl pb-4 leading-tight">
                    <a href="#" className=" hover:underline">
                      {blogItems[2][Lang].Blog[1]}
                    </a>
                  </h2>
                  <p className="text-black-400 pb-2">
                    {blogItems[2][Lang].Blog[2]}
                  </p>
                  <div className="text-black-200 inline-block py-1 italic text-sm">
                    {blogItems[2][Lang].Blog[3]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;