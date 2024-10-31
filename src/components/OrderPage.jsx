import React, { useEffect, useState } from "react";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    const interval = setInterval(() => {
      const updatedOrders = storedOrders.map((order) => {
        const currentTime = new Date().getTime();
        if (order.status === "pending") {
          if (currentTime - order.createdAt >= 3600000) {
            return { ...order, status: "completed" };
          }
        }
        return order;
      });

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="mb-8 text-4xl font-bold text-center text-blue-600">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => (
            <li
              key={index}
              className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {order.dealTitle}
              </h3>
              <p className="text-gray-600">
                Price: <span className="font-bold">Rs {order.price}</span>
              </p>
              <p className="text-gray-600">
                Name: <span className="font-bold">{order.name}</span>
              </p>
              <p className="text-gray-600">
                Video Link:{" "}
                <a
                  href={order.videolink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {order.videolink}
                </a>
              </p>
              <p className="text-gray-600">
                Transaction ID:{" "}
                <span className="font-bold">{order.transactionId}</span>
              </p>
              <p className="text-gray-500">
                Order Date:{" "}
                <span className="font-bold">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
              <p
                className={`mt-2 text-sm ${
                  order.status === "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: <span className="font-bold">{order.status}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderPage;
