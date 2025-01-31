import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data = await response.json();
        if (data.length > 0) {
          setOrder(data[0]); 
        }
      } catch (error) {
        console.error("Błąd podczas pobierania zamówienia:", error);
        navigate("/");
      }
    };

    fetchOrder();
  }, [navigate]);

  if (!order) {
    return <p>Ładowanie podsumowania zamówienia...</p>;
  }

  const halfTotal = order.total / 2;

  return (
    <div className="order-summary">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Dziękujemy za zakupy!
      </h2>
      <p>
        Aby sfinalizować zamówienie, skorzystaj z przycisku allegro poniżej.
        Każda sztuka w aukcji odpowiada kwocie 2,5 zł.
        Zamów odpowiednią liczbę sztuk, obliczając ją jako iloraz 155 ÷ 2,5:
      </p>
      <h4>
        {halfTotal}
        </h4>
      <p>
        Przy składaniu zamówienia na Allegro,
        proszę wpisać numer zamówienia w polu „Uwagi do zakupu”.
      </p>
      <h4>
        {order.orderNumber}
      </h4>

      <h2 className="text-2xl font-bold mb-4">Szczegóły zamówienia</h2>
      <h2 className="text-2xl font-bold mb-4">Numer zamówienia: {order.orderNumber}</h2>
      <div>
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img
              srcSet={item.imageLink}
              alt={item.name}
              className="w-16 h-16 object-cover border rounded"
            />
            <div>
              <p className="font-bold">{item.name}</p>
              <p>Kolor rolety: {item.color}</p>
              <p>Montowanie: {item.mounting}</p>
              <p>Cena: {item.price} zł</p>
              <p>Ilość: {item.quantity}</p>
              <p>Listwa: {item.selectedListwa?.name}</p>
              <p>Mocowania: {item.selectedMocowanie?.name}</p>
              <p>
                Wymiary: szerokość {item.width} i wysokość {item.height}
              </p>
            </div>
          </div>
        ))}
        <div className="total mt-4">
          <p className="font-bold text-lg">Suma: {order.total} zł</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
