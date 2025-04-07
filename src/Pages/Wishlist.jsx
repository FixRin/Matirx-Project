"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist,
} from "../Redux/WishlistSlice";
import { slugify } from "../Store/SlugConfig";
import { Link } from "react-router-dom";

function WishlistSidebar() {
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="  p-4 py-24 bg-texture">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl font-bold">Wishlist</h2>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="text-sm text-red-500 flex items-center"
            aria-label="Clear wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-1"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your wishlist is empty</p>
      ) : (
        <ul className="divide-y">
          {wishlistItems.map((item) => (
            <li key={item.id} className="py-3 flex items-center gap-3">
              <div className="w-16 h-16 relative flex-shrink-0">
                <img
                  src={item.img || "/placeholder.svg"}
                  alt={item.Title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
              </div>
              <div>{item.desc}</div>
              <div>
                {" "}
                <Link key={item.id} to={`/product/${slugify(item.title)}`}>
                  <button
                    style={{
                      height: "40px",

                      
                    }}
                    className=" mx-6 button-cutout-black group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                  >
                    More Details
                  </button>
                </Link>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label={`Remove ${item.name} from wishlist`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistSidebar;
