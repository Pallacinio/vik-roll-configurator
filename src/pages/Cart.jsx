import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import iconDelete from "../assets/icons/delete.png";


function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    const total = calculateTotal();
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, total }),
      });
      if (response.ok) {
        alert("Zamówienie zostało zapisane.");
        navigate("/order-summary"); 
      } else {
        alert("Błąd podczas zapisywania zamówienia.");
      }
    } catch (error) {
      console.error("Błąd:", error);
    }
  };    

  return (
    <div className="cart">
      <h2 className="m-auto w-10/12 text-2xl uppercase text-[#544e4a] text-center pb-2 mb-4 border-b-2 border-[#bbb3ad]">Koszyk</h2>
      {cartItems.length === 0 ? (
        <p className="p-10 text-center uppercase">Twój koszyk jest pusty</p>
      ) : (
        <div className="pb-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="m-auto w-10/12 md:w-full cart-item flex flex-col md:flex-row items-center gap-4 mb-4 px-5 py-4 md:px-10 md:py-5 border-2 border-[#544e4a] rounded-2xl"
            >
              <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 py-1"
                >
                  <img srcSet={iconDelete} alt="Usuń" className="m-auto w-[26px] h-[26px]" />
                </button>
              <img
                src={item.imageLink}
                alt={item.name}
                className="w-32 h-32 object-cover"
              />
              <div className="flex-grow text-lg">
                <p>Produkt: {item.name}</p>
                <p>Kolor rolety: {item.color}</p>
                <p>Montaż: {item.mounting}</p>
                <p>Szerokość [mm]: {item.width}</p>
                <p>Wysokość [mm]: {item.height}</p>
                <p>Listwa: {item.selectedListwa?.name}</p>
                <p>Mocowania: {item.selectedMocowanie?.name}</p>
              </div>
              <div className="flex-grow flex-col">
                <p className="text-lg uppercase text-[#544e4a]">Cena: </p>
                <p className="text-lg uppercase text-[#544e4a]">{item.price} zł</p>
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <div className="flex flex-col items-center">
                  <p className="text-lg uppercase text-[#544e4a]">Ilość: </p>
                  <div className="flex gap-2 items-center"> 
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                      className="px-2 py-0 bg-[#e9e9e9] border-[#544e4a] border-2 rounded-lg text-lg"
                      >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-0 bg-[#e9e9e9] border-[#544e4a] border-2 rounded-lg text-lg"
                      >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex-col">
                <p className="text-lg uppercase">Suma: </p>
                <p className="text-lg uppercase text-[#ce8b2b]">{item.price * item.quantity} zł</p>
              </div>
            </div>
          ))}
          <div className="total mt-4 p-2 text-center md:text-right flex justify-center md:justify-end">
            <p className="w-10/12 md:w-1/2 text-[#ce8b2b] border-[#bbb3ad] border-t-2 border-b-2 py-4 text-lg md:text-2xl">Łącznie: {calculateTotal()} zł</p>
          </div>
          <div className="mt-4 text-center md:text-right">
            <button
              onClick={handleSubmitOrder}
              className="px-10 py-2 md:px-16 md:py-4 bg-[#544e4a] text-white font-bold hover:bg-[#7c7068] uppercase rounded-[50px]"
            >
              Złóż zamówienie
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
