import React, { useEffect, useRef } from "react";
import "../Css/Products.css";
("use client");
import designPhoto from "../Assets/Images/Wear.png";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import { product } from "../Store";
import { Link } from "react-router-dom";
import { slugify } from "../Store/SlugConfig";
import { fetchProductData } from "../Redux/ProductsSlice";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
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
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const theme = useSelector((state) => state.theme.mode);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={` ${
        theme === "dark" ? "bg-texture bg-black text-white  " : "bg-texture "
      }`}

    >{!productItems[0]?<div></div>:
      <div>
      <div className="swiper-container-wrapper">
        <Swiper
          spaceBetween={0}
          centeredSlides={false}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper bg-transperent relative full-width-swiper"
        >
          <SwiperSlide className="bg-transperent  ">
            <video
              className="bg-transperent "
              playsInline
              autoPlay
              loop
              muted
              poster="//www.masongarments.com/cdn/shop/files/preview_images/4042398e663243b09132eb1494274dfa.thumbnail.0000000000_400x.jpg?v=1736761931"
            >
              <source
                type="video/mp4"
                src="//www.masongarments.com/cdn/shop/videos/c/vp/4042398e663243b09132eb1494274dfa/4042398e663243b09132eb1494274dfa.HD-1080p-7.2Mbps-40910469.mp4?v=0"
              />
            </video>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <video
              className="bg-transperent "
              playsInline
              autoPlay
              loop
              muted
              poster="https://cdn.create.vista.com/api/media/small/332829178/stock-video-flirty-racial-woman-touching-hair-while-posing-isolated-beige?videoStaticPreview=true&token="
            >
              <source
                type="video/mp4"
                src="https://cdn.create.vista.com/api/media/medium/332829178/stock-video-flirty-racial-woman-touching-hair-while-posing-isolated-beige?token="
              />
            </video>
          </SwiperSlide>
          <SwiperSlide>
          <video
              className="bg-transperent "
              playsInline
              autoPlay
              loop
              muted
              poster="https://cdn.create.vista.com/api/media/small/332829178/stock-video-flirty-racial-woman-touching-hair-while-posing-isolated-beige?videoStaticPreview=true&token="
            >
              <source
                type="video/mp4"
                src="https://cdn.create.vista.com/api/media/medium/785471632/stock-video-people-shot-monochrome-clothing-items-sweaters-jackets-jeans-hanger-clothes?token="
              />
            </video>
          </SwiperSlide>
          <SwiperSlide>  <video
              className="bg-transperent "
              playsInline
              autoPlay
              loop
              muted
              poster="https://cdn.create.vista.com/api/media/small/332829178/stock-video-flirty-racial-woman-touching-hair-while-posing-isolated-beige?videoStaticPreview=true&token="
            >
              <source
                type="video/mp4"
                src="https://cdn.create.vista.com/api/media/medium/783378304/stock-video-stack-boxes-words-books-clothes-written-them-boxes-piled-top?token="
              />
            </video></SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
      <div>
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative  z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className={`relative  ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto  py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full ${
                  theme === "dark"
                    ? "bg-black bg-texture text-white"
                    : "bg-texture bg-white"
                }`}
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200 ">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-2 py-3 font-medium ">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-[90%] items-center justify-between bg-white px-2 py-3  mt-5 mx-3 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime ">
                          <span className="font-medium ">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="min-w-0 flex-1 text-gray-50"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-baseline justify-between border-b border-gray-200  pb-3">
              <button
                style={{ height: "40px" }}
                className=" mt-5 mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium ">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium "
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-black-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-[90%] items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 mt-5 mx-5 button-cutout-black   group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {
                    <div>
                      <div className="mx-auto w-full max-w-6xl pb-10 mb-10 ">
                        <div>
                          <h2 className="font-sans uppercase text-7xl text-center mb-4">
                            Latest Drop
                          </h2>
                        </div>
                        <div>
                          <div className="text-center mb-6 text-xl">
                            <p>
                              Grab our freshest designs before they sell out!
                            </p>
                          </div>
                        </div>
                        <div className="grid w-full  grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                          {productItems[0].Products.map((item) => (
                                <Link
                                key={item.id}
                                to={`/product/${slugify(item.title)}`}>
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
                              <div className="mb-3 overflow-hidden py-4">
                                <svg
                                  className="absolute right-1 w-[100%] "
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
                                <img
                                  className="mx-auto w-[100%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-125 h-[350px]"
                                  height={464}
                                  width={130}
                                  src={item.img}
                                  style={{ objectFit: "contain" }}
                                />
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
                   
                  }
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            Our Categories
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance  sm:text-5xl">
            Everything you need to be coolest man in the room
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Cotton
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo.
                  </p>
                </div>
                <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-0 top-10 bottom-0 overflow-hidden rounded-t-[12cqw]   ">
                    <img
                      className="size-full object-cover object-top"
                      src="https://i.pinimg.com/736x/98/b0/a7/98b0a7b148b068a22f28b0bc86839ac3.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Design
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit
                    maiores impedit.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    className="w-[100%] max-lg:max-w-xs h-[300px]"
                    style={{ objectFit: "cover" }}
                    src={designPhoto}
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Delivery
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                    suspendisse semper morbi.
                  </p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2 pt-40">
                  <img
                    className="h-[min(152px,40cqw)] object-contain"
                    src="https://i.gifer.com/EIG1.gif"
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Strong Branding
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Sit quis amet rutrum tellus ullamcorper ultricies libero
                    dolor eget sem sodales gravida.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-20 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl ">
                    <div className="flex  ring-1 ring-white/5">
                      <img
                        className="size-full object-cover object-top"
                        src="https://i.pinimg.com/736x/98/b0/a7/98b0a7b148b068a22f28b0bc86839ac3.jpg"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
    
      </div>
      </div>
      }
    </div>
  );
};

export default Products;
