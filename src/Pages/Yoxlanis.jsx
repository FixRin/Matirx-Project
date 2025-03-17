"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function ResponsiveGSAPDemo() {
  // Media query hook (inline)
  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
      // Only run on client
      if (typeof window !== "undefined") {
        const media = window.matchMedia(query)
        setMatches(media.matches)

        const listener = (event) => {
          setMatches(event.matches)
        }

        media.addEventListener("change", listener)
        return () => {
          media.removeEventListener("change", listener)
        }
      }
    }, [query])

    return matches
  }

  // Refs for animated elements
  const boxRef = useRef(null)
  const circleRef = useRef(null)
  const textRef = useRef(null)

  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  // Animation timeline
  const tl = useRef(null)

  // Setup and handle responsive animations
  useEffect(() => {
    // Skip if not in browser
    if (typeof window === "undefined") return

    const setupAnimation = () => {
      // Kill existing animations
      if (tl.current) {
        tl.current.kill()
      }

      // Create new timeline
      tl.current = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      })

      // Apply different animations based on screen size
      if (isMobile) {
        console.log("Mobile animation applied")
        tl.current
          .to(boxRef.current, {
            x: "70vw",
            rotation: 180,
            duration: 2,
            ease: "power2.inOut",
          })
          .to(
            circleRef.current,
            {
              y: "15vh",
              scale: 1.2,
              duration: 1.5,
              ease: "bounce.out",
            },
            "<",
          )
          .to(
            textRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
            },
            "<0.5",
          )
      } else if (isTablet) {
        console.log("Tablet animation applied")
        tl.current
          .to(boxRef.current, {
            x: "40vw",
            rotation: 360,
            duration: 2.5,
            ease: "power1.inOut",
          })
          .to(
            circleRef.current,
            {
              y: "10vh",
              scale: 1.5,
              duration: 2,
              ease: "elastic.out(1, 0.3)",
            },
            "<0.2",
          )
          .to(
            textRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
            },
            "<0.3",
          )
      } else {
        console.log("Desktop animation applied")
        tl.current
          .to(boxRef.current, {
            x: "30vw",
            rotation: 720,
            duration: 3,
            ease: "power3.inOut",
          })
          .to(
            circleRef.current,
            {
              y: "8vh",
              scale: 1.8,
              duration: 2.5,
              ease: "back.out(1.7)",
            },
            "<0.5",
          )
          .to(
            textRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
            },
            "<0.8",
          )
      }
    }

    // Initial setup
    setupAnimation()

    // Reset on resize
    window.addEventListener("resize", setupAnimation)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setupAnimation)
      if (tl.current) {
        tl.current.kill()
      }
    }
  }, [isMobile, isTablet])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Responsive GSAP Animation</h1>
        <p className="text-gray-600 dark:text-gray-300">Resize your browser window to see how the animation adapts</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm">
            {isMobile ? "📱 Mobile View" : isTablet ? "📱 Tablet View" : "🖥️ Desktop View"}
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-4xl h-[50vh] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Box element */}
        <div
          ref={boxRef}
          className="absolute top-[20%] left-[10%] w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-blue-500 dark:bg-blue-400 rounded-md shadow-lg"
        />

        {/* Circle element */}
        <div
          ref={circleRef}
          className="absolute top-[60%] left-[50%] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-pink-500 dark:bg-pink-400 rounded-full transform -translate-x-1/2 shadow-lg"
        />

        {/* Text element */}
        <div
          ref={textRef}
          className="absolute bottom-[10%] left-[50%] transform -translate-x-1/2 translate-y-8 opacity-0 text-center bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg"
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">GSAP Animation</h2>
          <p className="text-sm md:text-base">Adapts to your screen size</p>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 max-w-lg text-center">
        <p>This animation uses viewport units (vw/vh) and different timelines based on screen size.</p>
        <p className="mt-2">Try viewing on different devices or resizing your browser window!</p>
      </div>
    </main>
  )
}

