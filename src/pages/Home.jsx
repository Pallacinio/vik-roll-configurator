import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import iconVr from '../assets/logo/logo.png';
import iconAllegro from '../assets/logo/allegro.png';

function Home() {
  useEffect(() => {
    document.getElementById("root").classList.add("home-background");
    
    return () => {
      document.getElementById("root").classList.remove("home-background");
    };
  }, []);

  return (
    <div className="min-h-[50vh] 2xl:min-h-[80vh]  flex flex-col items-center justify-center px-4">
      <h2 className="gradient-text text-center text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
        Twoje okna, Twoje zasady
      </h2>
      <Link
        to="/products"
        className="px-8 py-4 text-xl md:text-4xl font-bold bg-white text-[#544e4a] border-4 border-[#544e4a] rounded-full transition-all duration-300 hover:scale-105"
      >
        Konfiguruj
      </Link>
      <div className='absolute bottom-[10%] w-4/5 md:w-3/5 2xl:w-2/5 m-auto flex justify-center items-center py-10'>
        <div className='flex justify-center'>
            <img className='w-3/5 md:w-3/5' srcSet={iconVr} alt="ikona VIK-ROLL" />
        </div>
        <div className='flex justify-center'>
            <img className='w-3/5 md:w-3/5' srcSet={iconAllegro} alt="ikona Allegro" />
        </div>
    </div>
    </div>
  );
}

export default Home;
