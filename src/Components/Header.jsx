import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "../config/motion";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaMoon, FaSun, FaHeart, FaUser } from "react-icons/fa";
import supabase from "../Utils/Supabase";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "../Redux/ThemeSlice";
import { langChange } from "../Redux/LangSlice";
import { fetchData } from "../Redux/FetchLangData";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaXmark } from "react-icons/fa6";
import Basket from '../Pages/Basket'
import { useCart } from "react-use-cart";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [authView, setAuthView] = useState("login");
const {cartTotal} = useCart()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const { items, status, error } = useSelector((state) => state.data);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const Lang = useSelector((state) => state.lang.mode);
  const handleThemeChange = () => {
    dispatch(themeChange());
  };
  const handleLangChange = () => {
    dispatch(langChange());
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  
  return (
    <AnimatePresence>
      {!items[1] ? (
        <div></div>
      ) : (
        <motion.section
          {...slideAnimation("left")}
          style={{
            zIndex: "5",
            position: "fixed",
            backdropFilter: "blur(5px)",
          }}
          className="w-full"
        >
          {" "}
          <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <DialogPanel
                    transition
                    className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                aria-hidden="true"
                                className="size-6"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                          <Basket/>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            onClick={() => setOpen(False)}
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </div>
          </Dialog>
          <motion.header
            {...slideAnimation("down")}
            className="flex justify-around "
          >
            <Link to="/" className="">
              <img
                src=".\src\Assets\Images\pixel.png"
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
            </Link>
            <div className="xl:block flex-1 xl:flex hidden    justify-center gap-5 Pages">
              <ul className="flex-1 flex items-center  justify-center gap-5 Pages ">
                <li>
                  <NavLink to="/" className="homeLink">
                    {items[1][Lang].Header[0][0]}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about"> {items[1][Lang].Header[0][1]}</NavLink>
                </li>
                <li>
                  <NavLink to="/customizer">
                    {" "}
                    {items[1][Lang].Header[0][2]}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog"> {items[1][Lang].Header[0][3]}</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">
                    {" "}
                    {items[1][Lang].Header[0][4]}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products">
                    {" "}
                    {items[1][Lang].Header[0][5]}
                  </NavLink>
                </li>
              </ul>

              <Link to="/wishlist">
                <button
                  style={{ height: "50px", width: "40px", marginRight: "50px" }}
                  className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                >
                  <FaHeart />
                </button>{" "}
              </Link>
              <Link>
                <button
                  style={{ height: "50px", width: "40px", marginRight: "50px" }}
                  onClick={handleThemeChange}
                  className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                >
                  {theme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
              </Link>
              <Link>
                <button
                  onClick={handleLangChange}
                  style={{ height: "50px", width: "40px", marginRight: "50px" }}
                  className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                >
                  {Lang}
                </button>
              </Link>
              {session ? (
                <Link to="/dashboard">
                  <button
                    style={{
                      height: "50px",
                      width: "30px",
                      marginRight: "50px",
                    }}
                    className=" mt-5 mx-5 button-cutout-blue group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    <FaUser />
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button
                    style={{
                      height: "50px",
                      width: "60px",
                      marginRight: "50px",
                    }}
                    className=" mt-5 mx-5 button-cutout-blue group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    {items[1][Lang].Header[1][0]}
                  </button>
                </Link>
              )}
              <Link>
                <button
                  onClick={() => setOpen(() => true)}
                  style={{ height: "50px", width: "90px", marginRight: "50px" }}
                  className=" mt-5 mx-5 button-cutout-green group   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                >
                  <FaShoppingCart className="rotate-header-btn" />
                  {items[1][Lang].Header[1][1]}
                </button>
              </Link>
            </div>
            <div className="xl:hidden block pt-6  ">
              {mobileNavOpen?<FaXmark   onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className=" text-4xl"/>:
              <RxHamburgerMenu
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className=" text-4xl"
              />}
              <div
                className={mobileNavOpen ? "MenuItems active   " : "MenuItems  "}
              >
                {" "}
                <ul className="flex-col mt-20 flex items-center  justify-center gap-5 Pages  ">
                  <li>
                    <NavLink to="/" className="homeLink">
                      {items[1][Lang].Header[0][0]}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">
                      {" "}
                      {items[1][Lang].Header[0][1]}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/customizer">
                      {" "}
                      {items[1][Lang].Header[0][2]}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog"> {items[1][Lang].Header[0][3]}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">
                      {" "}
                      {items[1][Lang].Header[0][4]}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products">
                      {" "}
                      {items[1][Lang].Header[0][5]}
                    </NavLink>
                  </li>
                </ul>
                <div className="flex justify-center flex-wrap">
                <Link to="/wishlist">
                  <button
                    style={{
                      height: "50px",
                      width: "40px",
                      marginRight: "50px",
                    }}
                    className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    <FaHeart />
                  </button>{" "}
                </Link>
                <Link>
                  <button
                    style={{
                      height: "50px",
                      width: "40px",
                      marginRight: "50px",
                    }}
                    onClick={handleThemeChange}
                    className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                  </button>
                </Link>
                <Link>
                  <button
                    onClick={handleLangChange}
                    style={{
                      height: "50px",
                      width: "40px",
                      marginRight: "50px",
                    }}
                    className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    {Lang}
                  </button>
                </Link>
                {session ? (
                  <Link to="/dashboard">
                    <button
                      style={{
                        height: "50px",
                        width: "30px",
                        marginRight: "50px",
                      }}
                      className=" mt-5 mx-5 button-cutout-blue group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                    >
                      <FaUser />
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button
                      style={{
                        height: "50px",
                        width: "60px",
                        marginRight: "50px",
                      }}
                      className=" mt-5 mx-5 button-cutout-blue group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                    >
                      {items[1][Lang].Header[1][0]}
                    </button>
                  </Link>
                )}
                <Link>
                  <button
                    onClick={() => setOpen(() => true)}
                    style={{
                      height: "50px",
                      width: "90px",
                      marginRight: "50px",
                    }}
                    className=" mt-5 mx-5 button-cutout-green group   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    <FaShoppingCart className="rotate-header-btn" />
                    {items[1][Lang].Header[1][1]}
                  </button>
                </Link>
                </div>
              </div>
            </div>
          </motion.header>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Header;
