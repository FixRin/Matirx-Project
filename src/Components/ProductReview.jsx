

import { useState } from "react";

export default function ProductReviews() {
  // Product data

  // Reviews state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "These headphones are amazing! Great sound quality.",
      date: "2023-10-15",
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4,
      comment: "Good headphones, but a bit tight on my head.",
      date: "2023-09-28",
    },
  ]);

  // Form state
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  // Add a new review
  const addReview = (e) => {
    e.preventDefault();

    const review = {
      id: reviews.length + 1,
      name: 'aydincik',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([...reviews, review]);

    // Reset form
    setNewReview({
      name: "",
      rating: 5,
      comment: "",
    });
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-xl">
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto p-4">
      <div className="flex items-center">
        <StarRating rating={Math.round(averageRating)} />
        <span className="ml-2 text-gray-600">
          {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
        </span>
      </div>

      {/* Reviews List */}
      <div className=" rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b last:border-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{review.name}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={addReview} className="space-y-4">
          

          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={handleInputChange}
                className="w-48"
              />
              <span className="text-gray-600">{newReview.rating} stars</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-full  h-[40px]   button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black">
           Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}