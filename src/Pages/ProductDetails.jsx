"use client";
import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import ProductReviews from "../Components/ProductReview";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useCart } from "react-use-cart";
import { slugify } from "../Store/SlugConfig";
import { FaHeart } from "react-icons/fa";
import { product } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";
import { initializeWishlist, selectIsInWishlist, toggleWishlist } from "../Redux/WishlistSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  // Initialize wishlist from localStorage
  useEffect(() => {
    dispatch(initializeWishlist());
  }, [dispatch]);

  // Redux: fetch product data
  const { productItems, status, error } = useSelector(
    (state) => state.ProductData
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductData());
    }
  }, [status, dispatch]);

  // Find matching product by slug
  const product = productItems.find(
    (p) => slugify(p.title) === slug
  );
  useEffect(() => {
    if (status === "succeeded" && !product) navigate("/");
  }, [status, product, navigate]);

  // Loading / error
  if (status === "loading" || !product) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Wishlist and cart hooks
  const inWishlist = useSelector((state) =>
    selectIsInWishlist(state, product.id)
  );
  const { addItem } = useCart();


  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");

  // Handlers
  const handleWishlistClick = () => {
    dispatch(toggleWishlist(product));
    toast[inWishlist ? "info" : "success"](
      inWishlist ? "Removed from wishlist" : "Added to wishlist"
    );
  };
 

  const theme = useSelector((state) => state.theme.mode);
  // Star icon component using HTML/CSS
  const StarIcon = ({ filled, forRef }) => (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      id={forRef}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
  return (
    <div
      className={` ${
        theme === "dark" ? "bg-texture bg-gray-900 text-white  " : "bg-texture "
      }`}
    >
   
        <div className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={product.img || "https://placehold.co/600"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-medium">{product.title}</h1>
                  <span className="text-xl font-medium">{product.price}$</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={true} />
                    ))}
                  </div>
                  <a
                    href="#reviews"
                    className="text-sm text-blue-600 ml-2 hover:underline"
                  >
                    Read 42 reviews
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {/* Color Selection */}
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex gap-2">
                    <div
                      className={`w-8 h-8 rounded-full bg-black cursor-pointer border-2 ${
                        selectedColor === "black"
                          ? "border-indigo-600"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedColor("black")}
                    />
                    <div
                      className={`w-8 h-8 rounded-full bg-gray-400 cursor-pointer border-2 ${
                        selectedColor === "gray"
                          ? "border-indigo-600"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedColor("gray")}
                    />
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={`w-10 h-10 rounded-md flex items-center justify-center ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center border rounded-md w-10 h-10"
                    onClick={handleWishlistClick}
                  >
                    {!inWishlist  ? (
                      <FaRegHeart className="HeartEffect" />
                    ) : (
                      <FaHeart className="HeartEffect" />
                    )}
                  </div>
                  <button
                    onClick={() => {
                      addItem({
                        id: product.id,
                        price: product.price,
                        name: product.title,
                        image: product.img,
                        color: selectedColor,
                        desc: product.desc,
                      });
                      toast.success("Added to cart !", {
                        position: "bottom-left",
                        className:'toast-message'
                      });
                    }}
                    className="flex-1  h-[40px] mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    Add to cart
                  </button>
                  <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                  />
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-gray-600">{product.desc}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Looking for the perfect tee? The Basic Tee is comfortable
                      in a range of situations and pairs well with anything.
                    </p>
                  </div>

                  <hr className="border-gray-200" />

                  <div>
                    <h3 className="font-medium mb-2">Fabric & Care</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Only the best materials</li>
                      <li>• Ethically and locally made</li>
                      <li>• Pre-washed and pre-shrunk</li>
                      <li>• Machine wash cold with similar colors</li>
                    </ul>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm font-medium">
                        Free/Standard delivery
                      </p>
                      <p className="text-xs text-gray-500">2-4 days</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm font-medium">Locally sourced</p>
                      <p className="text-xs text-gray-500">Ethically made</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}

          <div>
            <ProductReviews />
          </div>
        </div>
   
    </div>
  );
}
