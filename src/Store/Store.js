import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "../Redux/ThemeSlice";
import LangSlice from '../Redux/LangSlice'
import FetchLangDataSlice from '../Redux/FetchLangData'
import TrendingBlogReducer from "../Redux/TrendingBlog";

export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    lang:LangSlice,
    langData:FetchLangDataSlice,
    data:FetchLangDataSlice,
    BlogData:TrendingBlogReducer,
   
  }, 
});