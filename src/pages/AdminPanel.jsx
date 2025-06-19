import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("https://vik-roll-configurator.onrender.com/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [navigate]);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toString().includes(searchTerm.trim())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <p className="text-center py-10 font-bold">Ładowanie zamówień...</p>;
  if (error) return <p className="text-red-500">Błąd: {error}</p>;

  return (
    <div className="admin-panel p-6">
      <h2 className="text-2xl font-bold mb-6 text-center uppercase">Panel Administracyjny</h2>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => {
          localStorage.removeItem("adminToken");
          navigate("/login");
        }}
      >
        Wyloguj
      </button>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Wyszukaj po numerze zamówienia..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {currentOrders.length === 0 ? (
        <p className="text-center text-gray-500">Brak zamówień</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-lg">
                <th className="border p-2">Numer zamówienia</th>
                <th className="border p-2">Szczegóły produktów</th>
                <th className="border p-2">Łączna kwota</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
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
                          <p>🟦 <strong>Kolor profilu:</strong> {item.selectedListwa?.name || "Brak"}</p>
                          <p>🟧 <strong>Kolor mocowania:</strong> {item.selectedMocowanie?.name || "Brak"}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Brak produktów w zamówieniu</p>
                    )}
                  </td>
                  <td className="border p-2">{order.total} zł</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-md border ${
              currentPage <= 1 ? "text-gray-400 border-gray-300" : "border-gray-700"
            }`}
          >
            Poprzednia
          </button>

          <span className="px-4 py-2">
            Strona {currentPage} z {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-md border ${
              currentPage >= totalPages ? "text-gray-400 border-gray-300" : "border-gray-700"
            }`}
          >
            Następna
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
