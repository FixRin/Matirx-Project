import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { FaStar, FaCheck } from "react-icons/fa";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";
import { slugify } from "../Store/SlugConfig";
import { useParams } from "react-router-dom";
import supabase from "../Utils/Supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// A memoized reply form that auto-focuses on mount
const ReplyForm = memo(({ id, value, onChange, onSubmit }) => {
  const theme = useSelector((s)=>s.theme.mode)
  const textareaRef = useRef(null);
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      // focus
      ta.focus();
      // move caret to end of current value
      const len = ta.value.length;
      ta.setSelectionRange(len, len);
    }
  }, []);
  return (
    <div className="mt-2">
      <textarea
        ref={textareaRef}
        dir="ltr"
        style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
        rows={2}
        className={`${theme=='dark'?'bg-gray-800':''} w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500`}
        placeholder="Write your reply…"
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
      <button
        onClick={() => onSubmit(id)}
        className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Post Reply
      </button>
    </div>
  );
});

const ProductReviews = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.theme.mode);
  const {
    productItems = [],
    status,
    error,
  } = useSelector((s) => s.ProductData);

  // User/session state
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  // Reviews & filtering
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userVotes, setUserVotes] = useState([]);

  // New review
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });

  // Reply state
  const [replyToReview, setReplyToReview] = useState(null);
  const [replyTextMap, setReplyTextMap] = useState({});

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Load session & profile
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, sess) => {
      setSession(sess);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("profiles")
      .select("id, FirstName, Surname, ProfilePicture, role")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [session]);

  // Fetch product data
  useEffect(() => {
    if (status === "idle") dispatch(fetchProductData());
  }, [status, dispatch]);

  const product = productItems.find((p) => slugify(p.title) === slug);

  // Initialize reviews array with replies[]
  useEffect(() => {
    if (!product?.Review) return;
    setReviews(
      product.Review.map((r) => ({
        ...r,
        replies: Array.isArray(r.replies) ? r.replies : [],
      }))
    );
  }, [product]);

  // Filter logic
  useEffect(() => {
    let result = [...reviews];
    if (filter === "helpful") {
      result.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
    } else if (filter !== "all") {
      const stars = parseInt(filter, 10);
      result = result.filter((r) => r.rating === stars);
    }
    setFilteredReviews(result);
  }, [filter, reviews]);

  const calculateAverage = () =>
    reviews.length
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  // Star rating component
  const StarRating = ({ rating, onChange }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar
          key={n}
          className={`cursor-pointer ${
            n <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onChange?.(n)}
        />
      ))}
    </div>
  );

  // Recursive helpers
  const addReplyRecursive = useCallback((comments, parentId, newReply) => {
    return comments.map((c) =>
      c.id === parentId
        ? { ...c, replies: [...(c.replies || []), newReply] }
        : {
            ...c,
            replies: addReplyRecursive(c.replies || [], parentId, newReply),
          }
    );
  }, []);

  const deleteReplyRecursive = useCallback((comments, idToDelete) => {
    return comments
      .map((c) => {
        if (c.id === idToDelete) return null;
        return {
          ...c,
          replies: deleteReplyRecursive(c.replies || [], idToDelete),
        };
      })
      .filter(Boolean);
  }, []);

  // Handlers
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.text.trim()) {
      toast.warn("Both a star rating and text are required.");
      return;
    }
    if (!profile) {
      toast.error("Please log in to submit a review.");
      return;
    }

    const review = {
      id: Date.now(),
      user_id: session.user.id,
      username: `${profile.FirstName} ${profile.Surname}`,
      profileImage: profile.ProfilePicture,
      date: new Date().toISOString(),
      rating: newReview.rating,
      text: newReview.text.trim(),
      helpfulVotes: 0,
      verifiedPurchase: false,
      replies: [],
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    setNewReview({ rating: 0, text: "" });
    await supabase
      .from("Product")
      .update({ Review: updated, star: calculateAverage() })
      .eq("id", product.id);
    toast.success("Review submitted!");
  };

  const handleHelpful = async (reviewId) => {
    if (!profile) {
      toast.error("Log in to vote.");
      return;
    }
    const userId = session.user.id;
    const { data: existing } = await supabase
      .from("ReviewHelpfulVotes")
      .select("*")
      .eq("review_id", reviewId)
      .eq("user_id", userId)
      .single();

    let updated;
    if (existing) {
      await supabase.from("ReviewHelpfulVotes").delete().eq("id", existing.id);
      updated = reviews.map((r) =>
        r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes - 1 } : r
      );
      setUserVotes((uv) => uv.filter((id) => id !== reviewId));
      toast.info("Removed your vote.");
    } else {
      await supabase
        .from("ReviewHelpfulVotes")
        .insert({ review_id: reviewId, user_id: userId });
      updated = reviews.map((r) =>
        r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r
      );
      setUserVotes((uv) => [...uv, reviewId]);
      toast.success("Thanks for your feedback!");
    }
    setReviews(updated);
    await supabase
      .from("Product")
      .update({ Review: updated })
      .eq("id", product.id);
  };

  const handleReplyChange = useCallback((id, text) => {
    setReplyTextMap((m) => ({ ...m, [id]: text }));
  }, []);

  const handleSubmitReply = async (parentId) => {
    if (!profile) {
      toast.error("Log in to reply.");
      return;
    }
    const text = (replyTextMap[parentId] || "").trim();
    if (!text) {
      toast.warn("Cannot post an empty reply.");
      return;
    }
    const reply = {
      id: Date.now(),
      user_id: session.user.id,
      username: `${profile.FirstName} ${profile.Surname}`,
      profileImage: profile.ProfilePicture,
      date: new Date().toISOString(),
      text,
      replies: [],
    };

    const updated = addReplyRecursive(reviews, parentId, reply);
    setReviews(updated);
    setReplyTextMap((m) => ({ ...m, [parentId]: "" }));
    setReplyToReview(null);
    await supabase
      .from("Product")
      .update({ Review: updated })
      .eq("id", product.id);
    toast.success("Reply posted!");
  };

  const confirmDeleteReview = async () => {
    setShowDeleteModal(false);
    const isTop = reviews.some((r) => r.id === reviewToDelete);
    const updated = isTop
      ? reviews.filter((r) => r.id !== reviewToDelete)
      : deleteReplyRecursive(reviews, reviewToDelete);
    setReviews(updated);
    setReviewToDelete(null);
    await supabase
      .from("Product")
      .update({ Review: updated, star: calculateAverage() })
      .eq("id", product.id);
    toast.success("Deleted.");
  };

  // Recursive renderer
  const RenderReplies = ({ replies, depth = 1 }) =>
    replies.map((rep) => (
      <div
        key={rep.id}
        className={`ml-${depth * 8} mt-4 p-4 rounded-lg ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <img
              src={rep.profileImage}
              alt={rep.username}
              className="w-8 h-8 rounded-full"
              onError={(e) => (e.target.src = "https://placehold.co/32")}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{rep.username}</span>
                <span className="text-xs text-gray-500">
                  {format(new Date(rep.date), "MMM d, yyyy")}
                </span>
              </div>
              <p className="mt-2 text-sm">{rep.text}</p>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            {(profile?.role === "admin" ||
              session?.user?.id === rep.user_id) && (
              <button
                onClick={() => {
                  setReviewToDelete(rep.id);
                  setShowDeleteModal(true);
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
            <button
              onClick={() =>
                setReplyToReview(replyToReview === rep.id ? null : rep.id)
              }
              className="text-blue-400 hover:underline"
            >
              {replyToReview === rep.id ? "Cancel" : "Reply"}
            </button>
          </div>
        </div>

        {replyToReview === rep.id && (
          <ReplyForm
            id={rep.id}
            value={replyTextMap[rep.id] || ""}
            onChange={handleReplyChange}
            onSubmit={handleSubmitReply}
          />
        )}

        {rep.replies?.length > 0 && (
          <RenderReplies replies={rep.replies} depth={depth + 1} />
        )}
      </div>
    ));

  if (status === "failed") return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ToastContainer
        position="bottom-left"
        theme={theme === "dark" ? "dark" : "light"}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteReview}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`border px-4 py-2 rounded text-sm ${
            theme === "dark" ? "bg-black text-white" : ""
          }`}
        >
          <option value="all">All Reviews</option>
          <option value="helpful">Most Helpful</option>
          {[5, 4, 3, 2, 1].map((s) => (
            <option key={s} value={s}>
              {s} Stars
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Summary */}
        <div
          className={`md:col-span-4 p-6 h-[400px] rounded-lg shadow-lg ${
            theme === "dark" ? "bg-gray-800/[0.8]" : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">{calculateAverage()}</h2>
          <StarRating rating={Math.round(calculateAverage())} />
          <p className="text-gray-600 mb-6">{reviews.length} reviews</p>
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = (
              (reviews.filter((r) => r.rating === star).length /
                (reviews.length || 1)) *
              100
            ).toFixed(0);
            return (
              <div key={star} className="flex items-center gap-2 mb-2">
                <span className="w-12 text-sm">{star} stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-12 text-right text-sm">{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className="md:col-span-8 space-y-6">
          {/* New Review */}
          <form
            onSubmit={handleSubmitReview}
            className={`p-6 rounded-lg shadow-lg mb-6 ${
              theme === "dark" ? "bg-gray-800/[0.8]" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Rating</label>
                <StarRating
                  rating={newReview.rating}
                  onChange={(r) => setNewReview((nr) => ({ ...nr, rating: r }))}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Review</label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                  }`}
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview((nr) => ({
                      ...nr,
                      text: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </form>

          {/* Each review with nested replies */}
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className={`p-6 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-800/[0.8]" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={r.profileImage}
                    alt={r.username}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => (e.target.src = "https://placehold.co/48")}
                  />
                  <div>
                    <h4 className="font-semibold">{r.username}</h4>
                    <p className="text-sm text-gray-500">
                      {format(new Date(r.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                {(profile?.role === "admin" ||
                  session?.user?.id === r.user_id) && (
                  <button
                    onClick={() => {
                      setReviewToDelete(r.id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>

              <StarRating rating={r.rating} />
              {r.verifiedPurchase && (
                <div className="flex items-center gap-1 text-green-600 mt-2">
                  <FaCheck /> Verified Purchase
                </div>
              )}
              <p className="mt-4">{r.text}</p>
              <button
                onClick={() => handleHelpful(r.id)}
                className={`text-sm mt-4 ${
                  userVotes.includes(r.id)
                    ? "text-green-600 font-semibold"
                    : "text-blue-400 hover:text-blue-600"
                }`}
              >
                Helpful ({r.helpfulVotes})
              </button>

              <div className="mt-4">
                <button
                  onClick={() =>
                    setReplyToReview(replyToReview === r.id ? null : r.id)
                  }
                  className="text-blue-400 hover:underline text-sm"
                >
                  {replyToReview === r.id ? "Cancel Reply" : "Reply"}
                </button>
              </div>

              {replyToReview === r.id && (
                <ReplyForm
                  id={r.id}
                  value={replyTextMap[r.id] || ""}
                  onChange={handleReplyChange}
                  onSubmit={handleSubmitReply}
                />
              )}

              {r.replies && r.replies.length > 0 && (
                <RenderReplies replies={r.replies} depth={1} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
