import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import Blog from "./Pages/Blog";
import Customizer from "./Pages/Customizer";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Wishlist from "./Pages/Wishlist";
import BlogDetails from "./Pages/BlogDetails";
import Products from "./Pages/Products";
import ChangePassword from "./Pages/ChangePassword";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import ProductDetails from "./Pages/ProductDetails";
import UpdatePassword from "./Pages/UpdatePassword";

const App = () => {

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/home"} element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/customizer" element={<Customizer />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/blogdetails" element={<BlogDetails />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path={"/dashboard"} element={<Dashboard />}></Route>
        <Route path={"/checkout"} element={<Checkout />}></Route>
        <Route
          path={"/orderConfirmation"}
          element={<OrderConfirmation />}
        ></Route>
        <Route path="/productDetail" element={<ProductDetails />}></Route>
        <Route path="/update-password" element={<UpdatePassword />}></Route>
   
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
