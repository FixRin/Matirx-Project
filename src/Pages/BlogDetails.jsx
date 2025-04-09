import React from "react";
import "../Css/BlogDetails.css";
import { useSelector } from "react-redux";
const BlogDetails = () => {
    const theme = useSelector((state) => state.theme.mode);
  return (
    <div    className={` ${
      theme === "dark"
        ? "bg-texture bg-gray-900 text-white pt-20 "
        : "bg-texture pt-20"
    }`} >
     
      <div className="flex flex-col items-center justify-center  w-100 pt-24 lg:pt-5">
      <div className="b-post-header__category  pt-12"><h1 className="text-2xl">Aydin Aliyev</h1></div>
      <time className="b-post-header__date" dateTime="2017-02-21T13:18:13.595Z">
        Feb 21
      </time>
        <img className="mt-5"
          src="https://moneycheck.com/wp-content/uploads/2024/08/nvidia.jpg"
          alt="news-image"
          border={0}
          style={{
            objectFit: "cover",
            width: "80%",
            height: "500px",
            borderRadius: "10px",
          }}
        />
      </div>
      <main role="main">
        <header className="b-post-header l-container">
          <h1 className="b-post-header__heading">
            WHY NVDIA STOCK LOST 20% YESTERDAY
          </h1>
        </header>
        <section className="b-post-main l-container">
          <div className="b-post-main__intro">
            <div className="b-post-main__col">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                cursus urna ac laoreet finibus. Etiam aliquam odio nec posuere
                facilisis. Curabitur aliquet quam eu nunc facilisis posuere.
                Nulla tincidunt lorem in tincidunt feugiat. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Nunc tristique, lorem ut porttitor facilisis, nibh libero
                rutrum dolor, dictum ultrices mi libero ac odio. Mauris
                consectetur lacinia elit a rutrum. Duis at molestie risus, eu
                suscipit augue.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetails;