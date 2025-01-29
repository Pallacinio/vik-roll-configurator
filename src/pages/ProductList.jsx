import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Progressbar from "../components/progressbar/Progressbar";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching JSON data");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <Progressbar/>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        <div className="w-full flex items-center justify-center gap-40">
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/products/${index}`}
              state={{ product }}
              className="cursor-pointer relative bg-[#eeeeee] border rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow duration-200 w-1/3 flex flex-row gap-10 group"
            >
              <div className="w-1/2 h-auto rounded-md">
                <img src={product.typeImage} alt={`${product.type} image`} />
              </div>
              <div className="w-1/2 h-auto rounded-md">
                <h2 className="text-[#544e4a] text-2xl font-bold mt-2 mb-2">{product.type}</h2>
                <p className="text-[#544e4a]">{product.typeDescription}</p>
              </div>
              <img
                className="bg-[#777777] absolute right-2 bottom-2 rounded-full flex items-center justify-center text-white text-4xl"
                srcSet="../src/assets/icons/link-button-icon.png"
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
