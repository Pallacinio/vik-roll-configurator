import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania zamówień");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Ładowanie zamówień...</p>;
  if (error) return <p className="text-red-500">Błąd: {error}</p>;

  return (
    <div className="admin-panel p-6">
      <h2 className="text-2xl font-bold mb-6 text-center uppercase">Panel Administracyjny</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Brak zamówień</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-lg">
                <th className="border p-2">Numer zamówienia</th>
                <th className="border p-2">Szczegóły produktów</th>
                <th className="border p-2">Łączna kwota</th>
                {/* <th className="border p-2">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderNumber} className="text-center text-xs md:text-base border-t">
                  <td className="border p-2">{order.orderNumber}</td>
                  <td className="border p-2 text-left">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div key={item.id} className="mb-4 p-2 border-b">
                          <p>🔢 <strong>Ilość:</strong> {item.quantity}</p>
                          <p>🛒 <strong>Produkt:</strong> Rolety {item.name}</p>
                          <p>🎨 <strong>Kolor rolety:</strong> {item.color}</p>
                          <p>📌 <strong>Montowanie:</strong> {item.mounting}</p>
                          <p>💰 <strong>Cena:</strong> {item.price} zł</p>
                          <p>📏 <strong>Szerokość:</strong> {item.width}mm</p>
                          <p>📐 <strong>Wysokość:</strong> {item.height}mm</p>
                          <p>🟦 <strong>Kolor listwy:</strong> {item.selectedListwa?.name || "Brak"}</p>
                          <p>🟧 <strong>Kolor mocowania:</strong> {item.selectedMocowanie?.name || "Brak"}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Brak produktów w zamówieniu</p>
                    )}
                  </td>
                  <td className="border p-2">{order.total} zł</td>
                  {/* <td className="border p-2">{order.status || "Nieznany"}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
