import React, { useEffect, useState } from "react";
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
import Test from "./Pages/Test";
import supabase from "./Utils/Supabase";
import UserDashboard from "./Pages/UserDashboard";
import LoginToPage from "./Pages/LoginToPage";
import ProductEdit from "./Pages/ProductEdit";
import { useParams } from "react-router-dom";
import ScrollToTop from "./Components/ScrollTop";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { id } = useParams(); // id should match the :id in your Route

  console.log("Route param:", id); // This should print the ID in the console
  return (
    <BrowserRouter>
     <ScrollToTop />
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
        <Route
          path="/wishlist"
          element={session ? <Wishlist /> : <LoginToPage />}
        ></Route>
        <Route path="/blogdetails/:section/:slug" element={<BlogDetails />}></Route>
        <Route path="/changepassword" element={session ? <ChangePassword /> : <LoginToPage />}></Route>
        <Route path="/register" element={!session ? <Register />: <NotFound />}></Route>
      
        <Route
          path={"/dashboard"}
          element={
            session ? (
              session.user.email === "chessaydin709@gmail.com" ? (
                <Dashboard />
              ) : (
                <UserDashboard />
              )
            ) : (
              <LoginToPage />
            )
          }
        ></Route>
        <Route
          path={"/checkout"}
          element={session ? <Checkout /> : <LoginToPage />}
        ></Route>
        <Route
          path="/productedit/:slug"
          element={
            session ? (
              session.user.email === "chessaydin709@gmail.com" ? (
                <ProductEdit />
              ) : (
                <NotFound />
              )
            ) : (
              <LoginToPage />
            )
          }
        ></Route>
        <Route
          path={"/orderConfirmation/:slug"}
          element={<OrderConfirmation />}
        ></Route>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/update-password" element={<UpdatePassword />}></Route>
        <Route path="/orderDetail/:slug" element={<OrderDetailsPage/>}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
