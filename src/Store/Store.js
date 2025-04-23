import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "../Redux/ThemeSlice";
import LangSlice from '../Redux/LangSlice'
import FetchLangDataSlice from '../Redux/FetchLangData'
import   productDataReducer  from "../Redux/ProductsSlice";
import wishlistReducer from '../Redux/WishlistSlice'
import activeTabReducer from '../Redux/ActiveTabSlice'

export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    lang:LangSlice,
    langData:FetchLangDataSlice,
    data:FetchLangDataSlice,
    ProductData: productDataReducer,
    wishlist:wishlistReducer,
    activeTab: activeTabReducer,
  }, 
});