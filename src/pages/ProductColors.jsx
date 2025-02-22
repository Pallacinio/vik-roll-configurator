import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Progressbar from "../components/progressbar/Progressbar";
import iconClick from '../assets/icons/white-click.png';

function ProductColors() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <>
      <Progressbar />
      <div className="p-8">
        <div className="flex items-center justify-center flex-wrap gap-10 w-full">
          {product.options.colors.map((color, index) => (
            <ColorCard key={index} color={color} product={product} navigate={navigate} />
          ))}
        </div>
      </div>
    </>
  );
}

function ColorCard({ color, product, navigate }) {
  const [currentImage, setCurrentImage] = useState(color.imageLink);
  const [isHovered, setIsHovered] = useState(false);

  const handleSelectColor = () => {
    navigate("/product/details", {
      state: {
        product: product,
        selectedColor: color,
      },
    });
  };

  return (
    <div
      onClick={handleSelectColor}
      className="relative cursor-pointer flex flex-col w-full sm:w-1/4 xl:w-1/5 items-center gap-1"
      onMouseOver={() => {
        if (color.imageLinkHover) {
          setCurrentImage(color.imageLinkHover);
          setIsHovered(true);
        }
      }}
      onMouseOut={() => {
        setCurrentImage(color.imageLink);
        setIsHovered(false);
      }}
    >
      {color.imageLinkHover && isHovered && (
        <img className="absolute right-2 top-2 z-10 w-[60px] h-[60px]" src={iconClick} alt="Click icon" />
      )}
      <div className="rounded-[25px] border-2 border-[#4b4441] overflow-hidden">
        <img
          className="scale-[140%] origin-top"
          src={currentImage}
          alt={color.name}
          />
      </div>
      <p className="text-xl font-semibold">{color.name}</p>
    </div>
  );
}

export default ProductColors;