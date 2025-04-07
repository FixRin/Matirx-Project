import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Text from "./Text";
import { Link } from "react-router-dom";
import { slugify } from "../Store/SlugConfig";
import { product } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";

gsap.registerPlugin(ScrollTrigger);
export default function Component() {
  
  const { productItems, status, error } = useSelector(
    (state) => state.ProductData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductData());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  let DivRef = useRef();
  const [isHoverable, setIsHoverable] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
    

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      console.log("Window size:", window.innerWidth)
    }

    // Set initial width
    handleResize()

    window.addEventListener("resize", handleResize)

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // First animation
  useGSAP(() => {
    if (width > 1260) {
      gsap.fromTo(
        img1,
        { top: 0, right: 0, scale: 1 },
        {
          scale: 2.2,
          top: 680,
          left: 750,
          scrollTrigger: {
            trigger: img1,
            start: 850,
            end: 1100,
            scrub: 3,
          },
          onStart: () => setIsHoverable(false),
          onReverseComplete: () => setIsHoverable(true),
        },
      )
    } else {
      // Reset animation when below threshold
      gsap.set(img1, { clearProps: "all" })
    }
  }, [width]) // Add width as dependency to re-run when width changes

  // Second animation
  useGSAP(() => {
    if (width > 1260) {
      gsap.fromTo(
        img2,
        { top: 0, right: 0, scale: 1 },
        {
          scale: 2.6,
          top: 2550,
          right: 150,
          scrollTrigger: {
            trigger: img1,
            start: 2350,
            end: 2850,
            scrub: 3,
          },
          onStart: () => setIsHoverable(false),
        },
      )
    } else {
      // Reset animation when below threshold
      gsap.set(img2, { clearProps: "all" })
    }
  }, [width]) // Add width as dependency

  // Third animation
  useGSAP(() => {
    if (width > 1260) {
      gsap.fromTo(
        img3,
        { top: 0, right: 0, scale: 1 },
        {
          scale: 2.6,
          top: 1930,
          left: 200,
          scrollTrigger: {
            trigger: img1,
            start: 2050,
            end: 2350,
            scrub: 3,
          },
          onStart: () => setIsHoverable(false),
        },
      )
    } else {
      // Reset animation when below threshold
      gsap.set(img3, { clearProps: "all" })
    }
  }, [width]) // Add width as dependency

  // Fourth animation
  useGSAP(() => {
    if (width > 1260) {
      gsap.fromTo(
        img4,
        { top: 0, right: 0, scale: 1 },
        {
          scale: 2.3,
          top: 1350,
          right: 850,
          scrollTrigger: {
            trigger: img1,
            start: 1250,
            end: 1550,
            scrub: 3,
          },
          onStart: () => setIsHoverable(false),
        },
      )
    } else {
      // Reset animation when below threshold
      gsap.set(img4, { clearProps: "all" })
    }
  }, [width]) // Add width as depe
  return (
    <div>
      <div className="mx-auto w-full max-w-6xl pb-10 mb-10 ">
        <Text />
        <div className="grid w-full  grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {product.map((item) => (
             <Link
             key={item.id}
             to={`/product/${slugify(item.title)}`}
             
           >
            <div
              className="group relative mx-auto w-full max-w-72 px-8 pt-4"
              key={item.id}
            >
              <svg
                className="absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400 left-4"
                preserveAspectRatio="none"
                shapeRendering="crispEdges"
                viewBox="0 0 8 555"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.42.73c-2.26 26.23.02-6.6 1.2 43.35.23 9.32-2.18 7.94-4.04 16.35a14.65 14.65 0 0 0 0 4.97c.97 7.34 3.34 14.33 3.57 21.8.25 8.41-2.29 16.65-2.16 25.08.34 22.7 4.9 14.96 2.83 34.25-.46 4.36-2.72 8.16-2.83 12.58-.25 10.5 1.83 20.9 1.79 31.4-.03 6.97-2.06 19.04-1.99 20.68.91 19.67 3.03 4.4 2.43 33.04-.84 39.25-3.08 33.75-2.85 51.02.13 9.92 2.04 19.65 2.3 29.56.18 7.18-1.19 14.32-.97 21.5.14 4.5 2.23 8.7 2.04 13.2-1.4 33.36-4.96 13.26-3.6 36.05 2.3 38.96 3.25 77.61.48 116.44-.24 3.35.3 7.14 1.08 11.1 2.16 10.89 2.16 23.87.92 31.24"
                  fill="none"
                  stroke="currentColor"
                />
              </svg>
              <svg
                className="absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400 right-4"
                preserveAspectRatio="none"
                shapeRendering="crispEdges"
                viewBox="0 0 8 555"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.42.73c-2.26 26.23.02-6.6 1.2 43.35.23 9.32-2.18 7.94-4.04 16.35a14.65 14.65 0 0 0 0 4.97c.97 7.34 3.34 14.33 3.57 21.8.25 8.41-2.29 16.65-2.16 25.08.34 22.7 4.9 14.96 2.83 34.25-.46 4.36-2.72 8.16-2.83 12.58-.25 10.5 1.83 20.9 1.79 31.4-.03 6.97-2.06 19.04-1.99 20.68.91 19.67 3.03 4.4 2.43 33.04-.84 39.25-3.08 33.75-2.85 51.02.13 9.92 2.04 19.65 2.3 29.56.18 7.18-1.19 14.32-.97 21.5.14 4.5 2.23 8.7 2.04 13.2-1.4 33.36-4.96 13.26-3.6 36.05 2.3 38.96 3.25 77.61.48 116.44-.24 3.35.3 7.14 1.08 11.1 2.16 10.89 2.16 23.87.92 31.24"
                  fill="none"
                  stroke="currentColor"
                />
              </svg>
              <svg
                className="-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400"
                preserveAspectRatio="none"
                shapeRendering="crispEdges"
                viewBox="0 0 266 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M.74 5.43c16.62-3.7 7.17-2.5 43.93-.8 17.36.79 15.14-2.9 24.1-2.63 1.21.04 5.55 1.98 7.47 2.14 5.24.42 8.17-.7 13.42-.44 3 .14 5.77 2.11 8.77 2.1 8.33-.04 16.56-2.19 24.89-2.25 10.32-.07 23.74 1.66 34.49 1.07 8.49-.46 17.47-1.77 25.92-2.65 11.98-1.24 18.38 2.3 30.24 3.88 12.82 1.7 5.26-2.3 21.35-2.14 10.15.1 19.92 1.14 29.88 1.7"
                  fill="none"
                  stroke="currentColor"
                />
              </svg>
              <div className="flex items-center justify-between text-xl">
                <span>{item.price}</span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="text-yellow-400"
                    height="1em"
                    width="1em"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>{" "}
                  {item.star}
                </span>
              </div>
              <div
                className="-mb-1 overflow-hidden py-4 relative z-[1]"
                id={`img${item.id}`}
              >
                {!isHoverable ? (
                  <div></div>
                ) : (
                  <svg
                    className="hover-effect"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 166 306"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="origin-center opacity-60 transition-[stroke-dashoffset] duration-500 ease-in [stroke-dasharray:1700] [stroke-dashoffset:1700] group-hover:[stroke-dashoffset:0]"
                      filter="url(#scribble)"
                      stroke="blue"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                      d="M126 8c-10 10-26 17-41 22-24 9-50 14-74 23a152 152 0 0 0 24 3l50 1c5 0 17 0 20 4 3 3-13 6-15 6a689 689 0 0 0-45 12c1 2 7 2 9 2 11 2 22 1 33 1l48-2 17 1c2 0-2 2-3 2l-8 2-60 11-32 7c-5 1-12 2-16 5-2 1 8 3 9 4 13 2 27 2 39 2 14 0 29-2 43 0 3 1 7 1 3 3-7 3-15 4-23 6l-41 7c-10 2-22 5-31 9-2 2-1 2 1 3l23 2c22 1 43 0 64 3 4 0 4 1 1 2l-20 7c-11 3-22 5-32 9l-14 6c-3 4 32 7 35 7 20 1 43 0 62 6 1 1 5 2 4 3-3 3-9 4-12 5-28 7-57 9-85 15l-30 7-9 3h1l13 1 53-1c15-1 31-1 47 1 10 1-2 4-6 5-14 4-29 5-44 8l-39 7c-2 1-22 5-22 7 0 3 58 4 65 5 6 0 17 0 23 3 1 1-4 3-4 3-16 6-36 7-52 10l-13 3a227 227 0 0 0 49 4c20 0 41 7 62 7"
                    />
                    <filter id="scribble">
                      <feTurbulence
                        baseFrequency="0.05"
                        id="turbulence"
                        numOctaves="2"
                        result="noise"
                        seed="0"
                      />
                      <feDisplacementMap
                        id="displacement"
                        in2="noise"
                        in="SourceGraphic"
                        scale="5"
                      />
                    </filter>
                  </svg>
                
                )}
                <div ref={DivRef}>
                  <img
                    className={`mx-auto w-[100%]  origin-top transform-gpu transition-transform duration-500 ease-in-out ${
                      isHoverable ? "group-hover:scale-125" : ""
                    } h-[400px]`}
                    height={464}
                    width={130}
                    src={item.img}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <svg
                className="-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400"
                preserveAspectRatio="none"
                shapeRendering="crispEdges"
                viewBox="0 0 266 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M.74 5.43c16.62-3.7 7.17-2.5 43.93-.8 17.36.79 15.14-2.9 24.1-2.63 1.21.04 5.55 1.98 7.47 2.14 5.24.42 8.17-.7 13.42-.44 3 .14 5.77 2.11 8.77 2.1 8.33-.04 16.56-2.19 24.89-2.25 10.32-.07 23.74 1.66 34.49 1.07 8.49-.46 17.47-1.77 25.92-2.65 11.98-1.24 18.38 2.3 30.24 3.88 12.82 1.7 5.26-2.3 21.35-2.14 10.15.1 19.92 1.14 29.88 1.7"
                  fill="none"
                  stroke="currentColor"
                />
              </svg>
              <h3 className="my-2 text-center font-sans leading-tight text-lg">
                {item.title}
              </h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
