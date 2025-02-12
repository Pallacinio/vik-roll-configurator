import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Progressbar from "../components/progressbar/Progressbar";

function ProductColors() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <>
      <Progressbar/>
      <div className="p-8">
        {/* <h1 className="text-3xl font-bold mb-8 text-center">{product.type} Colors</h1> */}
        <div className="flex items-center justify-center flex-wrap gap-10 w-full">
          {product.options.colors.map((color, index) => {
            const [currentImage, setCurrentImage] = useState(color.imageLink);

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
                key={index}
                onClick={handleSelectColor} 
                className="cursor-pointer flex flex-col w-full sm:w-1/4 xl:w-1/5 items-center gap-1"
              >
                <img
                  src={currentImage}
                  onMouseOver={() => setCurrentImage(color.imageLinkHover)}
                  onMouseOut={() => setCurrentImage(color.imageLink)}
                  alt={color.name}
                  className="rounded-lg shadow-md"
                />
                <p className="text-xl font-semibold">{color.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductColors;