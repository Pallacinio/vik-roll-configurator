import React from "react";
import { useNavigate } from "react-router-dom";
import iconBack from "../../assets/icons/btncomeback.png";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} 
      className="fixed bottom-5 left-2 p-6 md:left-5 bg-white text-[#544e4a] border-2 border-[#544e4a] rounded-[50%] hover:bg-[#eee]"
    >
        <img className="w-[20px] md:w-[40px]" srcSet={iconBack} alt="Przycisk powrotu na poprzednią stronę" />
    </button>
  );
};

export default BackButton;
