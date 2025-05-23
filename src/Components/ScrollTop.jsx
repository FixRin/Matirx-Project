// src/Components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"  // or "auto" if you don’t want the smooth animation
    });
  }, [pathname]);

  return null; // this component doesn’t render anything
};

export default ScrollToTop;
