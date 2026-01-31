import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Hero = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="relative w-full min-h-screen bg-[#f9fafb] text-gray-900 flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-gray-200 selection:text-black">
      {/* --- CSS: Fonts & Animation --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital@1&display=swap');
        
        .font-serif-accent {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        @keyframes float-drift {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(4px); }
        }
        .animate-drift { animation: float-drift 10s ease-in-out infinite; }
      `}</style>

      {/* --- Background: NEW Topographic/Contour Lines --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Abstract Contour Lines - Darker Gray (#9ca3af) */}
          <path
            d="M-100 600 C 200 550, 400 700, 800 500 S 1200 200, 1540 300"
            stroke="#9ca3af"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 500 C 150 450, 450 650, 850 450 S 1250 150, 1540 250"
            stroke="#9ca3af"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 400 C 100 350, 500 600, 900 400 S 1300 100, 1540 200"
            stroke="#9ca3af"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Intersecting/Alternative Flow Lines */}
          <path
            d="M-100 100 Q 400 300 900 100 T 1540 100"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeDasharray="10 10"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M-100 700 Q 400 500 900 700 T 1540 700"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeDasharray="10 10"
            fill="none"
            opacity="0.6"
          />

          {/* Large Circle Accent */}
          <circle
            cx="10%"
            cy="50%"
            r="300"
            stroke="#e5e7eb"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="90%"
            cy="20%"
            r="400"
            stroke="#e5e7eb"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* --- Background: Floating Words (Darker & Smaller) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Top Section */}
        <span
          className="absolute top-[5%] left-[5%] text-sm font-bold text-gray-500 animate-drift"
          style={{ animationDelay: "0s" }}
        >
          Hello
        </span>
        <span
          className="absolute top-[8%] left-[25%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "1s" }}
        >
          Bonjour
        </span>
        <span
          className="absolute top-[5%] right-[20%] text-sm font-bold text-gray-500 animate-drift"
          style={{ animationDelay: "2s" }}
        >
          Namaskar
        </span>
        <span
          className="absolute top-[12%] right-[5%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "3s" }}
        >
          Konnichiwa
        </span>

        {/* Middle Section */}
        <span
          className="absolute top-[30%] left-[10%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "4s" }}
        >
          Guten Tag
        </span>
        <span
          className="absolute top-[40%] right-[10%] text-sm font-bold text-gray-600 animate-drift"
          style={{ animationDelay: "5s" }}
        >
          Hola
        </span>
        <span
          className="absolute top-[25%] left-[80%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "1.5s" }}
        >
          Nǐ hǎo
        </span>
        <span
          className="absolute top-[45%] left-[5%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "2.5s" }}
        >
          Ciao
        </span>

        {/* Bottom Section */}
        <span
          className="absolute bottom-[20%] left-[15%] text-sm font-bold text-gray-600 animate-drift"
          style={{ animationDelay: "3.5s" }}
        >
          Vanakkam
        </span>
        <span
          className="absolute bottom-[10%] right-[25%] text-sm font-bold text-gray-500 animate-drift"
          style={{ animationDelay: "0.5s" }}
        >
          Sat Sri Akal
        </span>
        <span
          className="absolute bottom-[25%] right-[5%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "4.5s" }}
        >
          Olá
        </span>
        <span
          className="absolute bottom-[5%] left-[40%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "2s" }}
        >
          Anyoung
        </span>
        <span
          className="absolute bottom-[30%] right-[35%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "1s" }}
        >
          Salaam
        </span>
        <span
          className="absolute bottom-[15%] left-[5%] text-xs font-semibold text-gray-400 animate-drift"
          style={{ animationDelay: "3s" }}
        >
          Zdravstvuyte
        </span>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-4xl px-4 text-center mt-0">

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight mb-4">
          Bhasha.AI: <br />
          <span className="text-gray-800">Bharat ki shaan,</span> <br />
          <span className="font-serif-accent font-normal text-3xl md:text-5xl text-gray-500">
            (har Bhasha ek samaan)
          </span>
        </h1>

        {/* Single Line Description */}
        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 font-medium">
          Make your video into your mother tongue language at the click of a
          button.
        </p>

        {/* --- Buttons (Standard Rounded) --- */}
        <div className="flex flex-wrap justify-center gap-4">
          {isLoggedIn ? (
            <>
              {             
                <NavLink to="/profile">
                  <button className="rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all">
                    Profile
                  </button>
                </NavLink>
              }
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all">
                  Sign In
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-md bg-white border border-gray-300 px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 transition-all">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
