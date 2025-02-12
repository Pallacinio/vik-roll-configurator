import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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
      <h2 className="text-2xl font-bold mb-4 text-center uppercase">Koszyk</h2>
      {cartItems.length === 0 ? (
        <p className="p-10 text-center uppercase">Twój koszyk jest pusty</p>
      ) : (
        <div className="pb-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item flex items-center gap-4 mb-4 p-2 border-b"
            >
              <img
                src={item.imageLink}
                alt={item.name}
                className="w-16 h-16 object-cover border rounded"
              />
              <div className="flex-grow">
                <p className="font-bold">{item.name}</p>
                <p>Montaż: {item.mounting}</p>
                <p>Kolor rolety: {item.color}</p>
                <p>Cena: {item.price} zł</p>
                <p>Listwa: {item.selectedListwa?.name}</p>
                <p>Mocowania: {item.selectedMocowanie?.name}</p>
                <p>Wymiary: szerokość {item.width} i wysokość {item.height}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
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
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 py-1 text-red-600 hover:underline"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
          <div className="total mt-4 p-2 text-center md:text-right">
            <p className="font-bold text-lg">Suma: {calculateTotal()} zł</p>
          </div>
          <div className="mt-4 text-center md:text-right">
            <button
              onClick={handleSubmitOrder}
              className="px-4 py-2 bg-[#544e4a] text-white font-bold rounded hover:bg-[#7c7068] uppercase"
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
