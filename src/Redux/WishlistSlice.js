import { createSlice } from "@reduxjs/toolkit"

// Load initial state from localStorage (only on client side)
const loadState = () => {
  if (typeof window === "undefined") {
    return { items: [] }
  }

  try {
    const serializedState = localStorage.getItem("wishlist")
    if (serializedState === null) {
      return { items: [] }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading wishlist from localStorage:", err)
    return { items: [] }
  }
}

const initialState = { items: [] }

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    initializeWishlist: (state) => {
      const loadedState = loadState()
      state.items = loadedState.items
    },
    addToWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state))
        }
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state))
      }
    },
    toggleWishlist: (state, action) => {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingIndex >= 0) {
        // Remove from wishlist if already exists
        state.items.splice(existingIndex, 1)
      } else {
        // Add to wishlist if doesn't exist
        state.items.push(action.payload)
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state))
      }
    },
    clearWishlist: (state) => {
      state.items = []
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state))
      }
    },
  },
})

export const { initializeWishlist, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectIsInWishlist = (state, productId) => state.wishlist.items.some((item) => item.id === productId)

export default wishlistSlice.reducer

