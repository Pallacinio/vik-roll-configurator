import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("https://vik-roll-configurator.onrender.com/api/orders");
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
      <h2 className="mx-auto w-3/4 text-xl md:text-4xl font-bold mb-8 text-center uppercase">
        Dziękujemy za zakupy!
      </h2>
      <p className="text-[8px] md:text-sm text-center mb-6">
            <span className="block">
              Uwaga!
            </span>
            <span className="block">
              Wysyłka do paczkomatów InPost oraz Allegro One Box jest
            </span> 
            <span className="block">
              niemożliwa ze względu na wielkość paczki.
            </span> 
            <span className="block">
              W przypadku wyboru dostawy do któregoś z tych punktów
            </span>
            <span className="block">
              nasz dział obsługi klienta będzie się z Państwem
            </span>
            <span className="block">
              kontaktował w celu wysłania przesyłki na inny adres.
            </span>
      </p>
      <p className="text-xs md:text-lg text-center mb-6">
        <span className="block">
            Aby sfinalizować zamówienie, skorzystaj z przycisku allegro poniżej.
        </span>
        <span className="block">
            Każda sztuka w aukcji odpowiada kwocie 1 zł. 
        </span>
      </p>
      <h4 className="text-2xl md:text-6xl font-bold mb-6 text-center">
        {halfTotal}
      </h4>
      <div className="w-10/12 md:w-full mx-auto mb-6 flex items-center justify-center">
        <button className="px-5 md:px-10 py-4 rounded-[50px] bg-[#ebebeb]">
            Gdzie podać ilość?
        </button>
      </div>
      <p className="text-xs md:text-lg text-center mb-4">
        <span className="block">
            Przy składaniu zamówienia na Allegro,
        </span>
        <span className="block">
            proszę wpisać numer zamówienia w polu „Uwagi do zakupu”.
        </span>
      </p>
      <h4 className="text-2xl md:text-6xl font-bold mb-4 text-center">
        {order.orderNumber}
      </h4>
      <div className="w-10/12 md:w-full mx-auto mb-6 flex items-center justify-center">
        <button className="px-5 md:px-10 py-4 rounded-[50px] bg-[#ebebeb]">
            Gdzie wpisać numer zamówienia?
        </button>
      </div>
      <div className="w-10/12 md:w-full mx-auto mb-6 flex items-center justify-center">
        <button className="px-5 md:px-10 py-4 rounded-[50px] text-[#fff] bg-[#ff5a00] uppercase">
            Kliknij tutaj aby przejść do aukcji allegro
        </button>
      </div>
      <h2 className="text-lg md:text-2xl font-bold mt-10 md:mt-20 mb-4 text-center uppercase">Szczegóły zamówienia</h2>
      <div className="flex flex-col gap-4 md:gap-10">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-center gap-4 mb-4">
            <img
              srcSet={item.imageLink}
              alt={item.name}
              className="w-16 h-16 object-cover border rounded"
            />
            <div className="text-xs md:text-lg ">
              <p>Produkt: rolety {item.name}</p>
              <p>Kolor rolety: {item.color}</p>
              <p>Montowanie: {item.mounting}</p>
              <p>Cena: {item.price} zł</p>
              <p>Ilość: {item.quantity}</p>
              <p>Kolor listwy: {item.selectedListwa?.name}</p>
              <p>Kolor mocowania: {item.selectedMocowanie?.name}</p>
              <p>Szerokość {item.width}mm</p>
              <p>Wysokość {item.height}mm</p>
            </div>
          </div>
        ))}
        <div className="total mt-4 text-center">
            <p className="pb-2 font-bold text-xs md:text-lg ">Suma łącznie: {order.total} zł</p>
            <p className="pb-2 font-bold text-xs md:text-lg ">Ilość jednostek: {halfTotal}</p>
            <p className="pb-2 font-bold text-xs md:text-lg ">Numer zamówienia: {order.orderNumber}</p>
            <p className="pb-10 font-bold text-xs md:text-lg ">Aukcja allegro: <a href="" className="text-[#ff5a00] uppercase underline">Kliknij Tutaj</a></p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
