import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/FetchLangData";
import { Link } from "react-router-dom";
export default function Component() {
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
    <div >
      {!items[7]?<div></div>:
        <div>
          <section className="px-6 py-16 [.header+&]:pt-44 [.header+&]:md:pt-32 sticky top-[calc(0*2rem)] bg-texture bg-brand-blue text-white">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left">
                  <div className="slide-in">
                    <h2 className="font-sans uppercase text-7xl">
                      {items[7][Lang].Slider[0]}
                    </h2>
                  </div>
                  <div className="slide-in">
                    <div className="max-w-md text-lg leading-relaxed">
                      <p>
                        <strong>
                        {items[7][Lang].Slider[1]}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="slide-in">
                    <Link to='/products'
                      className="button-cutout-black h-[50px] group mx-4 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-lime to-brand-orange text-black"
                      href="https://suburbia-skate.netlify.app/"
                    >
                      {items[7][Lang].Slider[8]}
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 place-items-center">
                  <div className="col-start-1 row-start-1 transition-transform">
                    <img
                      className="w-11/12"
                      height={495}
                      width={403}
                      src="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format,compress&fit=max&w=1920"
                      srcSet="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1080 1x, https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1920 2x"
                    />
                  </div>
                  <div className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-16 [.header+&]:pt-44 [.header+&]:md:pt-32 sticky top-[calc(1*2rem)] bg-texture bg-brand-orange text-white">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left md:order-2">
                  <div className="slide-in">
                    <h2 className="font-sans uppercase text-7xl">
                    {items[7][Lang].Slider[2]}
                    </h2>
                  </div>
                  <div className="slide-in">
                    <div className="max-w-md text-lg leading-relaxed">
                      <p>
                        <strong>
                        {items[7][Lang].Slider[3]}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="slide-in">
                    <Link to='/products'
                      className="button-cutout-blue h-[50px] group mx-4 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-lime to-brand-orange text-black z-50"
                      href="https://suburbia-skate.netlify.app/"
                    >
                      {items[7][Lang].Slider[8]}
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 place-items-center">
                  <div className="col-start-1 row-start-1 transition-transform">
                    <img
                      className="w-11/12"
                      height={495}
                      width={403}
                      src="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format,compress&fit=max&w=1920"
                      srcSet="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1080 1x, https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1920 2x"
                    />
                  </div>
                  <div className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-16 [.header+&]:pt-44 [.header+&]:md:pt-32 sticky top-[calc(2*2rem)] bg-texture bg-brand-navy text-white">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left">
                  <div className="slide-in">
                    <h2 className="font-sans uppercase text-7xl">
                    {items[7][Lang].Slider[4]}
                    </h2>
                  </div>
                  <div className="slide-in">
                    <div className="max-w-md text-lg leading-relaxed">
                      <p>
                      {items[7][Lang].Slider[5]}
                      </p>
                    </div>
                  </div>
                  <div className="slide-in">
                    <Link to='/products'
                      className="button-cutout-black h-[50px] group mx-4 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-lime to-brand-orange text-black z-10"
                      href="https://suburbia-skate.netlify.app/"
                    >
                      {items[7][Lang].Slider[8]}
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 place-items-center">
                  <div className="col-start-1 row-start-1 transition-transform">
                    <img
                      className="w-11/12"
                      height={495}
                      width={403}
                      src="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format,compress&fit=max&w=1920"
                      srcSet="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1080 1x, https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1920 2x"
                    />
                  </div>
                  <div className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-16 [.header+&]:pt-44 [.header+&]:md:pt-32 sticky top-[calc(2*2rem)] bg-texture bg-brand-lime">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left md:order-2">
                  <div className="slide-in">
                    <h2 className="font-sans uppercase text-7xl">
                    {items[7][Lang].Slider[6]}
                    </h2>
                  </div>
                  <div className="slide-in">
                    <div className="max-w-md text-lg leading-relaxed">
                      <p>
                      {items[7][Lang].Slider[7]}
                      </p>
                    </div>
                  </div>
                  <div className="slide-in">
                    <Link to='/products'
                      className="button-cutout-green h-[50px] group mx-4 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-orange to-brand-lime text-black hover:text-black z-10"
                      href="https://suburbia-skate.netlify.app/"
                    >
                      {items[7][Lang].Slider[8]}
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 place-items-center">
                  <div className="col-start-1 row-start-1 transition-transform">
                    <img
                      className="w-11/12"
                      height={495}
                      width={403}
                      src="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format,compress&fit=max&w=1920"
                      srcSet="https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1080 1x, https://images.prismic.io/suburbia/Z1UNmpbqstJ98M3k_paint-background.png?auto=format%2Ccompress&fit=max&w=1920 2x"
                    />
                  </div>
                  <div className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    </div>
  );
}