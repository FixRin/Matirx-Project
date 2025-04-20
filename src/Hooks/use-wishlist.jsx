// hooks/useWishlist.js
"use client";

import { useState, useEffect } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    console.log("🔄 Loading wishlist from localStorage:", saved);
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch {
        localStorage.removeItem("wishlist");
      }
    }
  }, []);
console.log(wis)
  // Persist wishlist
  useEffect(() => {
    console.log("💾 Saving wishlist to localStorage:", wishlist);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) =>
    setWishlist((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item]
    );
  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
      return false;
    } else {
      addToWishlist(item);
      return true;
    }
  };

  const clearWishlist = () => setWishlist([]);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist };
}
