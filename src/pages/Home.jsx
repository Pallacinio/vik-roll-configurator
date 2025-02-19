import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.getElementById("root").classList.add("home-background");
    
    return () => {
      document.getElementById("root").classList.remove("home-background");
    };
  }, []);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
        Twoje okna, Twoje zasady
      </h2>
      <Link
        to="/products"
        className="px-8 py-4 text-lg md:text-xl bg-white text-[#544e4a] border-4 border-[#544e4a] rounded-full shadow-lg transition-all duration-300 hover:scale-105"
      >
        Konfiguruj
      </Link>
    </div>
  );
}

export default Home;
