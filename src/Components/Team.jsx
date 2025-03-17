import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Rafce() {
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
    <>
      <section className="px-6 py-16 [.header+&]:pt-44 [.header+&]:md:pt-32 bg-texture bg-brand-navy">
        {!items[5] ? (
          <div></div>
        ) : (
          <div className="mx-auto w-full max-w-6xl">
            <h2 className=" uppercase text-8xl font-bold mb-8 text-center text-white">
              {items[5][Lang].About[6]}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="skater group relative flex flex-col items-center gap-4">
                <div className="stack-layout overflow-hidden">
                  <img
                    className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
                    height={357}
                    width={264}
                    src="https://images.prismic.io/suburbia/Z1NbqpbqstJ98Lhy_sophie-back.png?auto=format,compress&q=20&fit=max&w=1080"
                    srcSet="https://images.prismic.io/suburbia/Z1NbqpbqstJ98Lhy_sophie-back.png?auto=format%2Ccompress&q=20&fit=max&w=640 1x, https://images.prismic.io/suburbia/Z1NbqpbqstJ98Lhy_sophie-back.png?auto=format%2Ccompress&q=20&fit=max&w=1080 2x"
                  />
                  <svg
                    className="relative text-brand-blue"
                    fill="none"
                    viewBox="0 0 231 312"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="skater-scribble-path animate-squiggle"
                      d="m12 150-2-32 2-27c2-16 14-36 18-52 4-38 47-25 77-23 19 1 38-6 56-4 9 1 17 7 25 13 6 6 14 11 16 20 3 11-4 26-3 38 2 12 7 21 7 33 2 28 2 55 2 83l-2 28c0 15 1 25-10 37-17 16-34 29-59 32-23 4-47 7-70 3-13-2-19-9-26-20-8-14-17-30-21-46-2-10-1-19 0-29l2-62c0-21 3-40 13-59 7-14 9-29 21-39 6-6 20-2 27-5 10-4 20 0 30 0 9-1 32-8 39-5 14 6 16 15 24 28 5 9-2 23 0 32 3 16 8 30 9 47 1 18-2 36-4 54-1 8 0 15-2 23l-8 12-10 14c-4 5-9 9-14 12l-18 9c-7 4-16 5-24 6-6 2-12 1-18 1-4-1-5-4-8-6l-9-10-12-17a65 65 0 0 1-11-32v-20l5-18c1-10-2-23 0-32 3-13 4-25 8-38 4-9 11-19 19-26 7-7 22-10 32-11 6 0 14 1 18 4 5 4 15 10 18 15 4 6 0 15 2 22l6 42-3 21c-1 10-4 18-8 27-5 12-11 27-24 31-8 3-19 5-28 2-10-5-13-20-14-30-1-7 0-14 1-21 4-17 0-44 8-61 5-8 23-9 28-8 6 0 12 6 14 12 3 6-3 16-3 23l-1 17c-1 9-2 19-6 27-2 5-6 10-10 14-6 7-8 4-10-5s1-19 3-28c1-9 4-18 7-26"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="9"
                    />
                  </svg>
                  <img
                    className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    height={357}
                    width={204}
                    src="https://www.nicepng.com/png/full/340-3400291_smiling-person-png-man-with-arms-crossed-png.png"
                  />
                  <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent" />
                  <h3 className="relative grid place-self-end justify-self-start p-2 font-bold text-brand-gray text-4xl">
                    <span className="mb-[-.3em] block">Sophie</span>
                    <span className="block">Castil</span>
                  </h3>
                </div>
              </div>

              <div className="skater group relative flex flex-col items-center gap-4">
                <div className="stack-layout overflow-hidden">
                  <img
                    className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
                    height={357}
                    width={264}
                    src="https://images.prismic.io/suburbia/Z1Nbq5bqstJ98Lh0_dylan-back.png?auto=format,compress&q=20&fit=max&w=1080"
                    srcSet="https://images.prismic.io/suburbia/Z1Nbq5bqstJ98Lh0_dylan-back.png?auto=format%2Ccompress&q=20&fit=max&w=640 1x, https://images.prismic.io/suburbia/Z1Nbq5bqstJ98Lh0_dylan-back.png?auto=format%2Ccompress&q=20&fit=max&w=1080 2x"
                  />
                  <svg
                    className="relative text-brand-lime"
                    fill="none"
                    viewBox="0 0 231 312"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="skater-scribble-path animate-squiggle"
                      d="m12 150-2-32 2-27c2-16 14-36 18-52 4-38 47-25 77-23 19 1 38-6 56-4 9 1 17 7 25 13 6 6 14 11 16 20 3 11-4 26-3 38 2 12 7 21 7 33 2 28 2 55 2 83l-2 28c0 15 1 25-10 37-17 16-34 29-59 32-23 4-47 7-70 3-13-2-19-9-26-20-8-14-17-30-21-46-2-10-1-19 0-29l2-62c0-21 3-40 13-59 7-14 9-29 21-39 6-6 20-2 27-5 10-4 20 0 30 0 9-1 32-8 39-5 14 6 16 15 24 28 5 9-2 23 0 32 3 16 8 30 9 47 1 18-2 36-4 54-1 8 0 15-2 23l-8 12-10 14c-4 5-9 9-14 12l-18 9c-7 4-16 5-24 6-6 2-12 1-18 1-4-1-5-4-8-6l-9-10-12-17a65 65 0 0 1-11-32v-20l5-18c1-10-2-23 0-32 3-13 4-25 8-38 4-9 11-19 19-26 7-7 22-10 32-11 6 0 14 1 18 4 5 4 15 10 18 15 4 6 0 15 2 22l6 42-3 21c-1 10-4 18-8 27-5 12-11 27-24 31-8 3-19 5-28 2-10-5-13-20-14-30-1-7 0-14 1-21 4-17 0-44 8-61 5-8 23-9 28-8 6 0 12 6 14 12 3 6-3 16-3 23l-1 17c-1 9-2 19-6 27-2 5-6 10-10 14-6 7-8 4-10-5s1-19 3-28c1-9 4-18 7-26"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="9"
                    />
                  </svg>
                  <img
                    className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    height={357}
                    width={204}
                    src="https://www.nicepng.com/png/full/340-3400291_smiling-person-png-man-with-arms-crossed-png.png"
                  />
                  <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent" />
                  <h3 className="relative grid place-self-end justify-self-start p-2 font-bold text-brand-gray text-4xl">
                    <span className="mb-[-.3em] block">Dylan</span>
                    <span className="block">Foster</span>
                  </h3>
                </div>
              </div>

              <div className="skater group relative flex flex-col items-center gap-4">
                <div className="stack-layout overflow-hidden">
                  <img
                    className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
                    height={357}
                    width={264}
                    src="https://images.prismic.io/suburbia/Z1Nbv5bqstJ98LiV_carter-back.png?auto=format,compress&q=20&fit=max&w=1080"
                    srcSet="https://images.prismic.io/suburbia/Z1Nbv5bqstJ98LiV_carter-back.png?auto=format%2Ccompress&q=20&fit=max&w=640 1x, https://images.prismic.io/suburbia/Z1Nbv5bqstJ98LiV_carter-back.png?auto=format%2Ccompress&q=20&fit=max&w=1080 2x"
                  />
                  <svg
                    className="relative text-brand-orange"
                    fill="none"
                    viewBox="0 0 231 312"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="skater-scribble-path animate-squiggle"
                      d="m12 150-2-32 2-27c2-16 14-36 18-52 4-38 47-25 77-23 19 1 38-6 56-4 9 1 17 7 25 13 6 6 14 11 16 20 3 11-4 26-3 38 2 12 7 21 7 33 2 28 2 55 2 83l-2 28c0 15 1 25-10 37-17 16-34 29-59 32-23 4-47 7-70 3-13-2-19-9-26-20-8-14-17-30-21-46-2-10-1-19 0-29l2-62c0-21 3-40 13-59 7-14 9-29 21-39 6-6 20-2 27-5 10-4 20 0 30 0 9-1 32-8 39-5 14 6 16 15 24 28 5 9-2 23 0 32 3 16 8 30 9 47 1 18-2 36-4 54-1 8 0 15-2 23l-8 12-10 14c-4 5-9 9-14 12l-18 9c-7 4-16 5-24 6-6 2-12 1-18 1-4-1-5-4-8-6l-9-10-12-17a65 65 0 0 1-11-32v-20l5-18c1-10-2-23 0-32 3-13 4-25 8-38 4-9 11-19 19-26 7-7 22-10 32-11 6 0 14 1 18 4 5 4 15 10 18 15 4 6 0 15 2 22l6 42-3 21c-1 10-4 18-8 27-5 12-11 27-24 31-8 3-19 5-28 2-10-5-13-20-14-30-1-7 0-14 1-21 4-17 0-44 8-61 5-8 23-9 28-8 6 0 12 6 14 12 3 6-3 16-3 23l-1 17c-1 9-2 19-6 27-2 5-6 10-10 14-6 7-8 4-10-5s1-19 3-28c1-9 4-18 7-26"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="9"
                    />
                  </svg>
                  <img
                    className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    height={357}
                    width={204}
                    src="https://www.nicepng.com/png/full/340-3400291_smiling-person-png-man-with-arms-crossed-png.png"
                  />
                  <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent" />
                  <h3 className="relative grid place-self-end justify-self-start p-2 font-bold text-brand-gray text-4xl">
                    <span className="mb-[-.3em] block">Carter</span>
                    <span className="block">Bell</span>
                  </h3>
                </div>
              </div>

              <div className="skater group relative flex flex-col items-center gap-4">
                <div className="stack-layout overflow-hidden">
                  <img
                    className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
                    height={357}
                    width={264}
                    src="https://images.prismic.io/suburbia/Z1NbqJbqstJ98Lhv_jordan-back.png?auto=format,compress&q=20&fit=max&w=1080"
                    srcSet="https://images.prismic.io/suburbia/Z1NbqJbqstJ98Lhv_jordan-back.png?auto=format%2Ccompress&q=20&fit=max&w=640 1x, https://images.prismic.io/suburbia/Z1NbqJbqstJ98Lhv_jordan-back.png?auto=format%2Ccompress&q=20&fit=max&w=1080 2x"
                  />
                  <svg
                    className="relative text-brand-pink"
                    fill="none"
                    viewBox="0 0 231 312"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="skater-scribble-path animate-squiggle"
                      d="m12 150-2-32 2-27c2-16 14-36 18-52 4-38 47-25 77-23 19 1 38-6 56-4 9 1 17 7 25 13 6 6 14 11 16 20 3 11-4 26-3 38 2 12 7 21 7 33 2 28 2 55 2 83l-2 28c0 15 1 25-10 37-17 16-34 29-59 32-23 4-47 7-70 3-13-2-19-9-26-20-8-14-17-30-21-46-2-10-1-19 0-29l2-62c0-21 3-40 13-59 7-14 9-29 21-39 6-6 20-2 27-5 10-4 20 0 30 0 9-1 32-8 39-5 14 6 16 15 24 28 5 9-2 23 0 32 3 16 8 30 9 47 1 18-2 36-4 54-1 8 0 15-2 23l-8 12-10 14c-4 5-9 9-14 12l-18 9c-7 4-16 5-24 6-6 2-12 1-18 1-4-1-5-4-8-6l-9-10-12-17a65 65 0 0 1-11-32v-20l5-18c1-10-2-23 0-32 3-13 4-25 8-38 4-9 11-19 19-26 7-7 22-10 32-11 6 0 14 1 18 4 5 4 15 10 18 15 4 6 0 15 2 22l6 42-3 21c-1 10-4 18-8 27-5 12-11 27-24 31-8 3-19 5-28 2-10-5-13-20-14-30-1-7 0-14 1-21 4-17 0-44 8-61 5-8 23-9 28-8 6 0 12 6 14 12 3 6-3 16-3 23l-1 17c-1 9-2 19-6 27-2 5-6 10-10 14-6 7-8 4-10-5s1-19 3-28c1-9 4-18 7-26"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="9"
                    />
                  </svg>
                  <img
                    className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    height={357}
                    width={204}
                    src="https://www.nicepng.com/png/full/340-3400291_smiling-person-png-man-with-arms-crossed-png.png"
                  />
                  <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent" />
                  <h3 className="relative grid place-self-end justify-self-start p-2 font-bold  text-brand-gray text-4xl">
                    <span className="mb-[-.3em] block">Jordan</span>
                    <span className="block">Lee</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}