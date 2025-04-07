import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "../Redux/ThemeSlice";
import LangSlice from '../Redux/LangSlice'
import FetchLangDataSlice from '../Redux/FetchLangData'
import TrendingBlogReducer from "../Redux/TrendingBlog";
import   productDataReducer  from "../Redux/ProductsSlice";
import wishlistReducer from '../Redux/WishlistSlice'


export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    lang:LangSlice,
    langData:FetchLangDataSlice,
    data:FetchLangDataSlice,
    BlogData:TrendingBlogReducer,
    ProductData: productDataReducer,
    wishlist:wishlistReducer
  }, 
});