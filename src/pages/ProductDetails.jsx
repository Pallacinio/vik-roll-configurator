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
  const mocowaniaColors = product?.options?.mocowaniaColors?.[mountingType] || [];

  const priceTable = {
    nonInvasive: {
      width: [
        { range: [150, 350], price: 122 },
        { range: [351, 400], price: 127 },
        { range: [401, 450], price: 132 },
        { range: [451, 500], price: 137 },
        { range: [501, 550], price: 142 },
        { range: [551, 600], price: 147 },
        { range: [601, 750], price: 152 },
        { range: [651, 700], price: 157 },
        { range: [701, 750], price: 162 },
        { range: [751, 800], price: 167 },
        { range: [801, 850], price: 172 },
        { range: [851, 900], price: 177 },
        { range: [901, 950], price: 182 },
        { range: [951, 1000], price: 187 },
        { range: [1001, 1050], price: 192 },
        { range: [1051, 1100], price: 197 },
        { range: [1101, 1150], price: 202 },
        { range: [1151, 1200], price: 207 },
      ],
      height: [
        { range: [150, 1500], addition: 0 },
        { range: [1501, 2300], addition: 15 },
        { range: [2301, 2800], addition: 45 },
      ],
    },
    invasive: {
      width: [
        { range: [200, 350], price: 110 },
        { range: [351, 400], price: 115 },
        { range: [401, 450], price: 120 },
        { range: [451, 500], price: 125 },
        { range: [501, 550], price: 130 },
        { range: [551, 600], price: 135 },
        { range: [601, 650], price: 140 },
        { range: [651, 700], price: 145 },
        { range: [701, 750], price: 150 },
        { range: [751, 800], price: 155 },
        { range: [801, 850], price: 160 },
        { range: [851, 900], price: 165 },
        { range: [901, 950], price: 170 },
        { range: [951, 1000], price: 175 },
        { range: [1001, 1050], price: 180 },
        { range: [1051, 1100], price: 185 },
        { range: [1101, 1150], price: 190 },
        { range: [1151, 1200], price: 195 },
        { range: [1201, 1250], price: 245 },
        { range: [1251, 1300], price: 250 },
        { range: [1301, 1350], price: 255 },
        { range: [1351, 1400], price: 260 },
        { range: [1401, 1450], price: 265 },
        { range: [1451, 1500], price: 270 },
        { range: [1501, 1550], price: 275 },
        { range: [1551, 1600], price: 280 },
        { range: [1601, 1650], price: 285 },
        { range: [1651, 1700], price: 290 },
        { range: [1701, 1750], price: 295 },
        { range: [1751, 1800], price: 300 },
        { range: [1801, 1850], price: 305 },
        { range: [1851, 2000], price: 310 },
      ],
      height: [
        { range: [150, 1500], addition: 0 },
        { range: [1501, 2300], addition: 15 },
        { range: [2301, 2800], addition: 45 },
      ],
    },
  };

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

    return widthPrice + heightAddition;
  };

  useEffect(() => {
    if (width && height) {
      const calculatedPrice = calculatePrice();
      setPrice(calculatedPrice);
    }
  }, [width, height, mountingType]);


  const handleAddToCart = () => {
    const validationError = validateDimensions();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!width || !height || !selectedListwa || !selectedMocowanie) {
      alert("Proszę wypełnić wszystkie pola przed dodaniem do koszyka.");
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name: product.type,
      color: selectedColor.name,
      imageLink: selectedColor.imageLink,
      price: price,
      quantity,
      width,
      height,
      selectedListwa,
      selectedMocowanie,
    };

    addToCart(newProduct);
    alert("Produkt został dodany do koszyka!");
  };

  return (
    <>
      <Progressbar />
      <h2 className="text-center text-4xl font-bold">Wybrany kolor: {selectedColor.name}</h2>
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
            title="Wybierz kolor listwy"
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