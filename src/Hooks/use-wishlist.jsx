"use client"

import { useState, useEffect } from "react"

export function useWishlist() {
  const [wishlist, setWishlist] = useState([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        localStorage.removeItem("wishlist")
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      // Check if item already exists in wishlist
      if (prev.some((existingItem) => existingItem.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== itemId))
  }

  const isInWishlist = (itemId) => {
    return wishlist.some((item) => item.id === itemId)
  }

  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
      return false
    } else {
      addToWishlist(item)
      return true
    }
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  }
}

