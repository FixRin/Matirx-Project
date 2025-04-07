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
import { selectIsInWishlist, toggleWishlist } from "../Redux/WishlistSlice";

export default function ProductPage() {
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
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the product that matches the slug
  const producta = productItems[0].Products.find(
    (product) => slugify(product.title) === slug
  );

  // If no product is found, redirect to home page
  useEffect(() => {
    if (!producta) {
      navigate("/");
    }
  }, [producta, navigate]);

  // If product is still loading or not found, show loading state
  if (!producta) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  const isInWishlist = useSelector((state) => selectIsInWishlist(state, producta.id))

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(producta))
   add===true?setAdd(false):setAdd(true)
  }

  
  const [quantity, setQuantity] = useState(1);
  const [add,setAdd] = useState(true)
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [reviewText, setReviewText] = useState("");
  const [newReview, setNewReview] = useState({
    name: "fsdf",
    rating: 5,
    comment: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === "rating" ? Number(value) : value,
    });
  };
  const { addItem } = useCart();

  const textRef = useRef();

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const [reviews, setReviews] = useState([
    {
      name: "Amelia M.",
      date: "March 14, 2023",
      rating: 5,
      review:
        "Didn't buy enough, need more! This is such a versatile staple piece. The cotton is very comfortable to wear and washes well. I wish I had ordered more colors.",
    },
    {
      name: "Jessica P.",
      date: "February 28, 2023",
      rating: 5,
      review:
        "Very comfy and looks like pics! The material is soft and comfortable. I love the good feeling material that it has and the fit is perfect.",
    },
    {
      name: "Laura G.",
      date: "February 23, 2023",
      rating: 4,
      review:
        "I bought two of these quality cotton t-shirts, and will be back for more in other colors! I love the way they fit and wash. I've had mine for over a month now and they still look great.",
    },
  ]);
  const handleStar = () => {};
  const handleText = (e) => {
    e.preventDefault();

    const review = {
      id: reviews.length + 1,
      name: "sdfsf",
      rating: "3",
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([...reviews, review]);
    console.log(review);
    // Reset form
    setNewReview({
      name: "",
      rating: 5,
      comment: setReviewText,
    });
  };

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
    <div className="bg-texture">
      {!producta ? (
        <div></div>
      ) : (
        <div className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={producta.img || "https://placehold.co/600"}
                  alt={producta.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-medium">{producta.title}</h1>
                  <span className="text-xl font-medium">{producta.price}$</span>
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
                  
                    onClick={handleToggleWishlist}
                  >
                    {add ? <FaRegHeart className="HeartEffect" /> : <FaHeart className="HeartEffect" />}
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: producta.id,
                        price: producta.price,
                        name: producta.title,
                        image: producta.img,
                        color: selectedColor,
                      })
                    }
                    className="flex-1  h-[40px] mx-5 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    Add to cart
                  </button>
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-gray-600">
                      The Basic Tee is an honest new take on a classic. The tee
                      uses super soft, pre-shrunk cotton for true comfort and a
                      dependable fit. They are hand cut and sewn locally, with a
                      special dye technique that gives each tee it's own look.
                    </p>
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
      )}
    </div>
  );
}
