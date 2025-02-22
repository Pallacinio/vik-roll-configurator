import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Progressbar from "../components/progressbar/Progressbar";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching JSON data");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const adjustHeights = () => {
      const productCards = document.querySelectorAll(".product-card");
      let maxHeight = 0;

      productCards.forEach((card) => {
        card.style.height = "auto"; // Resetuj wysokość
        maxHeight = Math.max(maxHeight, card.clientHeight);
      });

      productCards.forEach((card) => {
        card.style.height = `${maxHeight}px`; // Ustaw maksymalną wysokość
      });
    };

    adjustHeights();
    window.addEventListener("resize", adjustHeights);
    
    return () => window.removeEventListener("resize", adjustHeights);
  }, [products]);

  return (
    <>
      <Progressbar/>
      <div className="p-8 md:py-8 md:px-0">
        <div className="w-full flex items-center lg:justify-center xl:justify-between gap-10 flex-wrap">
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/products/${index}`}
              state={{ product }}
              className="product-card w-full md:1/2 lg:w-8/12 xl:w-[45%]  cursor-pointer relative bg-[#eeeeee] border-2 border-[#544e4a] rounded-[25px] p-2 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row gap-2 group"
            >
              <div className="w-full sm:w-1/2 min-h-60 h-auto rounded-[25px] overflow-hidden">
                <img src={product.typeImage} alt={`${product.type} image`} className="w-full h-full object-cover" />
              </div>
              <div className="w-full sm:w-1/2 h-auto rounded-[25px] py-6">
                <h2 className="text-[#544e4a] text-2xl font-bold mt-2 mb-2">{product.type}</h2>
                <ul className="text-[#544e4a] list-disc ml-4">
                {product.typeDescription
                  .split(". ")
                  .filter(sentence => sentence.trim() !== "") 
                  .map((sentence, i) => (
                    <li key={i}>{sentence.trim().replace(/\.$/, "")}</li>
                  ))}
                </ul>
              </div>
              <img
                className="bg-[#777777] absolute right-2 bottom-2 rounded-full flex items-center justify-center text-white text-4xl"
                srcSet="../assets/icons/link-button-icon.png"
                alt="Strzałka wybierz"
              />
              <div className="triangle-clip-background absolute bottom-0 right-0 bg-[#f6f6f6] w-full p-10 pb-3 pr-2 bg-opacity-90 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="bg-[#777777] rounded-full p-4 pl-6 pr-6 text-white text-lg uppercase inline-block">
                  wybierz
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
