import { useState, useEffect, useRef } from "react";
import { FaStar, FaUser, FaCheck, FaSort, FaFilter } from "react-icons/fa";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";
import { slugify } from "../Store/SlugConfig";
import { useParams } from "react-router-dom";
import supabase from "../Utils/Supabase";

const ProductReviews = () => {
  const { slug } = useParams();
  const nameRef = useRef();
  const reviewRef = useRef();
  const dispatch = useDispatch();
  const { productItems, status, error } = useSelector(
    (state) => state.ProductData
  );
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
    username: "",
  });
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const { data: subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => setSession(session)
      );

      return () => subscription?.unsubscribe();
    };
    fetchSession();
  }, []);

  const [Profiledata, setProfileData] = useState(null);
  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        const { data: profiles } = await supabase.from("profiles").select("*");
        const userProfile = profiles.find(
          (user) => user.email === session.user.email
        );
        setProfileData(userProfile);
      };
      fetchProfile();
    }
  }, [session]);

  console.log(Profiledata);
  const product = productItems.find((p) => slugify(p.title) === slug);
  // fetch products
  useEffect(() => {
    if (status === "idle") dispatch(fetchProductData());
  }, [status, dispatch]);

  if (status === "failed") return <div>Error: {error}</div>;

  // pull out the right product's reviews
  useEffect(() => {
    setData(product?.Review || []);
    console.log(product);
  }, [productItems, slug]);

  // map raw `data` → UI‐ready `reviews`
  useEffect(() => {
    setReviews(
      !data
        ? ""
        : data.map((review) => ({
            id: review.id,
            username: review.username,
            profileImage: review.profileImage,
            date: new Date(), // or `new Date()` for "now"
            rating: review.rating,
            text: review.text,

            helpfulVotes: review.helpfulVotes,
          }))
    );
  }, [data]);

  // …the rest of your sorting/filtering/form logic stays the same…
  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingPercentages = () => {
    const ratingCounts = Array(5).fill(0);
    reviews.forEach((review) => ratingCounts[review.rating - 1]++);
    return ratingCounts.map((count) => (count / reviews.length) * 100);
  };

  const handleSort = (method) => {
    setSortBy(method);
    let sortedReviews = [...reviews];
    switch (method) {
      case "recent":
        sortedReviews.sort((a, b) => b.date - a.date);
        break;
      case "highest":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      case "helpful":
        sortedReviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        break;
      default:
        break;
    }
    setReviews(sortedReviews);
  };

  const handleFilter = (rating) => {
    setFilterRating(rating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.text || !newReview.username) {
      alert("Please fill all fields");
      return;
    }
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date(),

      helpfulVotes: 0,
      profileImage: Profiledata.ProfilePicture,
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, text: "", username: "" });
    console.log(review);
    const { data, error } = await supabase
      .from("Product")
      .update({
        Review: [review, ...reviews],
      })
      .eq("id", product.id)
      .select(); // this is important to return updated data

    if (error) {
      console.error("Update failed:", error.message);
      alert("Update failed: " + error.message);
    } else {
      console.log("Product updated:", review);
    }
  };

  const theme = useSelector((state) => state.theme.mode);
  const StarRating = ({ rating, onRatingChange = null }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4  py-8 ">
      <div className="grid md:grid-cols-12 gap-8 ">
        {/* Rating Summary */}
        <div
          className={`md:col-span-4  ${
            theme === "dark" ? "bg-gray-800/[0.8]" : "bg-white"
          }  p-6 rounded-lg shadow-lg`}
        >
          <h2 className="text-3xl font-bold mb-4">
            {calculateAverageRating()}
          </h2>
          <div className="mb-4">
            <StarRating rating={Math.round(calculateAverageRating())} />
          </div>
          <p className="text-gray-600 mb-6">{reviews.length} reviews</p>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {getRatingPercentages()
              .reverse()
              .map((percentage, idx) => (
                <div key={5 - idx} className="flex items-center gap-2">
                  <span className="w-12 text-sm">{5 - idx} stars</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-right">
                    {Math.round(percentage)}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="md:col-span-8 ">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6 text-black">
            <select
              className="px-4 py-2 border rounded-lg"
              onChange={(e) => handleSort(e.target.value)}
              value={sortBy}
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg"
              onChange={(e) => handleFilter(Number(e.target.value))}
              value={filterRating}
            >
              <option value="0">All Ratings</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>

          {/* Review Form */}
          <form
            onSubmit={handleSubmitReview}
            className={`${
              theme === "dark" ? "bg-gray-800/[0.8]" : "bg-white"
            }  p-6 rounded-lg shadow-lg mb-6`}
          >
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <StarRating
                  rating={newReview.rating}
                  onRatingChange={(rating) =>
                    setNewReview({ ...newReview, rating })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="nameRef"
                  className="w-full px-4 py-2 border rounded-lg text-black"
                  value={
                    Profiledata
                      ? Profiledata.FirstName + " " + Profiledata.Surname
                      : ""
                  }
                  disabled
                  ref={nameRef}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Review</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg text-black"
                  rows="4"
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      text: e.target.value,
                      username: nameRef.current.value,
                    })
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600  px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>

          {/* Review List */}
          <div className="space-y-6 ">
            {reviews
              .filter(
                (review) => filterRating === 0 || review.rating === filterRating
              )
              .map((review) => (
                <div
                  ref={reviewRef}
                  key={review.id}
                  className={`${
                    theme === "dark" ? "bg-gray-800/[0.8]" : "bg-white"
                  }  p-6 rounded-lg shadow-lg`}
                >
                  <div className="flex items-center  gap-4 mb-4">
                    <img
                      src={review.profileImage}
                      alt={review.username}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                      }}
                    />
                    <div className="flex justify-between w-full">
                      <div>
                        <h4 className="font-semibold">{review.username}</h4>
                        <p className="text-sm ">
                          {format(review.date, "MMM d, yyyy")}
                        </p>
                      </div>

                      <div>
                        {!Profiledata ? (
                          <div></div>
                        ) : Profiledata.email === "chessaydin709@gmail.com" ? (
                          <button
                            style={{
                              height: "50px",
                            }}
                            className="  mx-5 button-cutout-blue group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                          >
                            Delete
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  {review.verifiedPurchase && (
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-2">
                      <FaCheck /> Verified Purchase
                    </div>
                  )}
                  <p className="mt-4">{review.text}</p>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      key={review.id}
                      className="text-sm text-blue-400   hover:text-blue-600"
                    >
                      {console.log(reviewRef)}
                      Helpful ({review.helpfulVotes})
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
