import React, { useEffect, useRef } from "react"
import "../Css/Footer.css"

import { useSelector } from "react-redux";
export default function Footer() {
  const bubblesContainerRef = useRef(null)
  const theme = useSelector((state) => state.theme.mode);
  useEffect(() => {
    if (bubblesContainerRef.current) {
      // Create bubbles
      for (let i = 0; i < 128; i++) {
        const bubble = document.createElement("div")
        bubble.classList.add("bubble")
        bubble.style.setProperty("--size", `${2 + Math.random() * 4}rem`)
        bubble.style.setProperty("--distance", `${6 + Math.random() * 4}rem`)
        bubble.style.setProperty("--position", `${-5 + Math.random() * 110}%`)
        bubble.style.setProperty("--time", `${2 + Math.random() * 2}s`)
        bubble.style.setProperty("--delay", `${-1 * (2 + Math.random() * 2)}s`)
        bubblesContainerRef.current.appendChild(bubble)
      }
    }
  }, [])

  return (
    <div className={`${theme==="dark"?'bg-texture bg-gray-900 text-white':'bg-texture'}`}>
      <footer className="footer w-full " >
        <div className="bubbles" ref={bubblesContainerRef}></div>
        <div className="footer-content">
          <div className="about-logo">
            <img
              src="/pixel.png"
              alt="Your Logo"
            />
          </div>
          <div className="footer-section about">
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <div className="footer-section links">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#section3">Services</a>
              </li>
              <li>
                <a href="#section1">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>          <div className="footer-section links">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#section3">Services</a>
              </li>
              <li>
                <a href="#section1">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>          <div className="footer-section links">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#section3">Services</a>
              </li>
              <li>
                <a href="#section1">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>          <div className="footer-section links">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#section3">Services</a>
              </li>
              <li>
                <a href="#section1">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
         
        </div>
      </footer>
      <svg >
        <defs>
          <filter id="blob">
          <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" /> 
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
