import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../Components/Loader";
import { slugify } from "../Store/SlugConfig";
import supabase from "../Utils/Supabase";
const Blog = () => {
  const theme = useSelector((state) => state.theme.mode);
  const Lang = useSelector((state) => state.lang.mode);

  const dispatch = useDispatch();
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingBlog, setTrendingBlog] = useState({});
  useEffect(() => {
    const fetchTrending = async () => {
      // Adjust the select() to match your table columns
      const { data, error } = await supabase.from("trendingblog").select("*");

      if (error) {
        console.error("Error loading trending blogs:", error);
      } else {
        setTrendingBlog(data);
      }
      setLoading(false);
    };

    fetchTrending();
  }, [trendingBlog]);
  useEffect(() => {
    const fetchLatest = async () => {
      // Adjust the select() to match your table columns
      const { data, error } = await supabase.from("latestblog").select("*");

      if (error) {
        console.error("Error loading trending blogs:", error);
      } else {
        setLatestBlog(data);
      }
      setLoading(false);
    };

    fetchLatest();
  }, [latestBlog]);
  useEffect(() => {
    const fetchFeatured = async () => {
      // Adjust the select() to match your table columns
      const { data, error } = await supabase.from("featuredblog").select("*");

      if (error) {
        console.error("Error loading trending blogs:", error);
      } else {
        setFeaturedBlog(data);
      }
      setLoading(false);
    };

    fetchFeatured();
  }, [featuredBlog]);

  const titleKey = `Title${Lang.toUpperCase()}`; // => 'TitleEN' or 'TitleAZ'
  const descKey = `Desc${Lang.toUpperCase()}`;

  if (loading) return <p>Loading trending posts…</p>;
  if (trendingBlog.length === 0) return <p>No trending posts found.</p>;
  if (latestBlog.length === 0) return <p>No Latest posts found.</p>;

  return (
    <div
      className={` ${
        theme === "dark"
          ? "bg-texture bg-gray-900 text-white pt-20 "
          : "bg-texture pt-20"
      }`}
    >
      {!trendingBlog[0] ? (
        <div className="pb-80 ">
          <Loader />
        </div>
      ) : (
        <div className=" min-h-screen">
          <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-4">
            <h2 className="border-b-2 border-yellow-600 mb-4">
              <span className="bg-yellow-600 px-2 py-1 text-white uppercase tracking-wide">
                {Lang === "EN" ? "Trending" : "Trend olan"}
              </span>
            </h2>
            <div className="flex flex-col flex-wrap md:flex-row md:-mx-2">
              {trendingBlog.map((blogitems, index) => (
                <div
                  className="w-full md:w-1/2 lg:w-1/4 mb-4 lg:mb-0"
                  key={index}
                >
                  <Link
                    to={`/blogdetails/${slugify("trendingBlog")}/${slugify(
                      blogitems.TitleEN
                    )}`}
                    className="h-72 md:h-96 block group relative md:mx-2 overflow-hidden"
                  >
                    <img
                      src={blogitems.img}
                      className="absolute z-0 object-cover w-full h-72 md:h-96 transform group-hover:scale-150"
                    />
                    <div className="absolute gradient transition duration-300 group-hover:bg-black group-hover:opacity-90 w-full h-72 md:h-96 z-10" />
                    <div className="absolute left-0 right-0 bottom-0 p-6 z-30 transform translate-y-1/2 transition duration-300 h-full group-hover:translate-y-0 delay-100">
                      <div className="h-1/2 relative">
                        <div className="absolute bottom-0">
                          <h2 className="font-bold text-white leading-tight transition duration-300 text-xl pb-6 group-hover:underline">
                            {blogitems[titleKey]}
                          </h2>
                        </div>
                      </div>
                      <div className="h-1/2">
                        <p className="text-white  opacity-0 transition duration-300 group-hover:opacity-100">
                          {blogitems[descKey]}
                        </p>
                        <button className="bg-white text-black text-sm px-3 my-2 py-1 font-semibold opacity-0 transition duration-300 group-hover:opacity-100 border-2 border-white focus:border-black focus:bg-gray-300">
                          {Lang === "EN" ? "Read More" : "Daha Çox Oxuyun"}
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
                      {Lang === "EN" ? "Latest" : "Sonuncu"}
                    </span>
                  </h2>
                  {latestBlog.map((latestBlogItems, index) => (
                    <div className="flex flex-wrap items-center md:-mx-2">
                      <div className="w-full md:w-3/12">
                        <div className="md:mx-2">
                          <img
                            src={latestBlogItems.img}
                            className="w-full mb-4 md:mb-0"
                          />
                        </div>
                      </div>
                      <div className="md:w-9/12">
                        <div className="md:mx-2">
                          <h2 className=" font-bold text-2xl pb-4 leading-tight">
                            <Link
                              to={`/blogdetails/${slugify(
                                "latestBlog"
                              )}/${slugify(latestBlogItems.TitleEN)}`}
                              className=" hover:underline"
                            >
                              {latestBlogItems[titleKey]}
                            </Link>
                          </h2>
                          <p className="text-black-400 pb-2">
                            {" "}
                            {latestBlogItems[descKey]}
                          </p>
                          <div className="text-black-200 inline-block py-1 italic text-sm">
                            {Lang == "EN"
                              ? `Posted on: ${
                                  latestBlogItems.Date +
                                  " by " +
                                  latestBlogItems.AuthorName
                                }`
                              : `Yerləşdirildi: ${
                                  latestBlogItems.Date +
                                  " " +
                                  latestBlogItems.AuthorName
                                } tərəfindən`}
                            {console.log(latestBlog)}
                          </div>
                        </div>
                      </div>
                      <div className="w-full mb-5 pb-5 border-b border-gray-700 md:mx-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/3 mb-4 lg:mb-0">
                {!featuredBlog[0] ? (
                  <div></div>
                ) : (
                  <div className="md:mx-4">
                    <h2 className="border-b-2 border-indigo-600 mb-4">
                      <span className="bg-indigo-600 px-2 py-1 text-white uppercase tracking-wide">
                        {Lang == "EN" ? "Featured" : "Nümayiş Etdirilmiş"}
                      </span>
                    </h2>
                    <img src={featuredBlog[0].img} className="w-full mb-4" />
                    <h2 className=" font-bold text-2xl pb-4 leading-tight">
                      <Link
                        to={`/blogdetails/${slugify("FeaturedBlog")}/${slugify(
                          featuredBlog[0][titleKey]
                        )}`}
                        className=" hover:underline"
                      >
                        {featuredBlog[0][titleKey]}
                      </Link>
                    </h2>
                    <p className="text-black-400 pb-2">
                      {featuredBlog[0][descKey]}
                    </p>
                    <div className="text-black-200 inline-block py-1 italic text-sm">
                      {Lang == "EN"
                        ? "Posted on: November 19, 2021 by Stephen Ainsworth"
                        : "Yerləşdirildi: 19 noyabr 2021-ci il, Stephen Ainsworth tərəfindən"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
