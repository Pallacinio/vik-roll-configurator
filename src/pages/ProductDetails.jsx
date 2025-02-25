import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";
import Progressbar from "../components/progressbar/Progressbar";

import ProductPreview from "../components/productDetails/ProductPreview";
import MountingSelection from "../components/productDetails/MountingSelection";
import DimensionsInput from "../components/productDetails/DimensionsInput";
import CartSummary from "../components/productDetails/CartSummary";
import ColorSelection from "../components/productDetails/ColorSelection";

import Swal from "sweetalert2";

function ProductDetails() {
  const location = useLocation();
  const { product, selectedColor } = location.state || {};

  const { addToCart } = useCart();

  const [selectedListwa, setSelectedListwa] = useState(null);
  const [selectedMocowanie, setSelectedMocowanie] = useState(null);
  const [mountingType, setMountingType] = useState("invasive");
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState(0);
  const [constraints, setConstraints] = useState({
    width: { min: 200, max: 5000 },
    height: { min: 150, max: 2800 },
  });
  const [error, setError] = useState("");

  const listwyColors = product?.options?.listwyColors || [];
  // const mocowaniaColors = product?.options?.mocowaniaColors?.[mountingType] || [];
  const mocowaniaColors = product?.options?.mocowaniaColors?.[mountingType] || [];

  const priceProduct = product?.options?.pricing;

  const priceTable = priceProduct;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); 

  useEffect(() => {
    const newConstraints =
      mountingType === "nonInvasive"
        ? { width: { min: 150, max: 1200 }, height: { min: 150, max: 2800 } }
        : { width: { min: 200, max: 2000 }, height: { min: 150, max: 2800 } };
    setConstraints(newConstraints);
    setSelectedMocowanie(null);
    setError("");
    setPrice(0);
  }, [mountingType]);

  const validateDimensions = () => {
    const { width: widthRange, height: heightRange } = constraints;
    if (width < widthRange.min || width > widthRange.max) {
      return `Szerokość musi być w zakresie ${widthRange.min} - ${widthRange.max} mm.`;
    }
    if (height < heightRange.min || height > heightRange.max) {
      return `Wysokość musi być w zakresie ${heightRange.min} - ${heightRange.max} mm.`;
    }
    return "";
  };

  const calculatePrice = () => {
    const widthPrice =
      priceTable[mountingType].width.find(
        (entry) => width >= entry.range[0] && width <= entry.range[1]
      )?.price || 0;

    const heightAddition =
      priceTable[mountingType].height.find(
        (entry) => height >= entry.range[0] && height <= entry.range[1]
      )?.addition || 0;
    
    const listwaPrice = selectedListwa?.price || 0;

    return widthPrice + heightAddition + listwaPrice;
  };

  useEffect(() => {
    if (width && height) {
      const calculatedPrice = calculatePrice();
      setPrice(calculatedPrice);
    }
  }, [width, height, mountingType, selectedListwa]);


  const handleAddToCart = () => {
    const validationError = validateDimensions();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!width || !height || !selectedListwa || !selectedMocowanie) {
      Swal.fire({
        icon: "warning",
        title: "Uwaga!",
        text: "Proszę wypełnić wszystkie pola przed dodaniem do koszyka.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'bg-[#544e4a] text-white'
        }
      });
      return;
    }

    const mountingLabels = {
      nonInvasive: "Bezinwazyjny",
      invasive: "Inwazyjny",
      invasiveAngular: "Inwazyjny Kątowy"
    };    

    const newProduct = {
      id: uuidv4(),
      name: product.type,
      color: selectedColor.name,
      mounting: mountingLabels[mountingType],
      imageLink: selectedColor.imageLink,
      price: price,
      quantity,
      width,
      height,
      selectedListwa,
      selectedMocowanie,
    };

    addToCart(newProduct);

    Swal.fire({
      icon: "success",
      title: "Produkt został dodany do koszyka!",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: 'bg-[#544e4a] text-white'
      }
    }).then(() => {
      window.location.href = '/cart';
    });
    
  };

  return (
    <>
      <Progressbar />
      <h2 className="text-lg uppercase text-[#544e4a] text-center">
        Roleta {product.type}
        <br />
        Wybrany kolor: {selectedColor.name}
      </h2>
      <div className="p-8 flex flex-col xl:flex-row gap-10">
        {/* Product Preview */}
        <ProductPreview
          selectedColor={selectedColor}
          selectedListwa={selectedListwa}
          selectedMocowanie={selectedMocowanie}
          mountingType={mountingType}
        />
        {/* Product Details */}
        <div className="flex-1">
          <MountingSelection
            mountingType={mountingType}
            setMountingType={setMountingType}
          />
          <DimensionsInput
            width={width}
            height={height}
            constraints={constraints}
            setWidth={setWidth}
            setHeight={setHeight}
            error={error}
          />
          <ColorSelection
            title="Wybierz kolor profilu"
            colors={listwyColors}
            selectedColor={selectedListwa}
            setSelectedColor={setSelectedListwa}
          />
          <ColorSelection
            title="Wybierz kolor mocowania"
            colors={mocowaniaColors}
            selectedColor={selectedMocowanie}
            setSelectedColor={setSelectedMocowanie}
          />
          <CartSummary
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            price={price}
          />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;