import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com"; // Import EmailJS

function PricingPage() {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    videolink: "",
    transactionId: "",
  });

  emailjs.init("jFNMFNa7chg6CBP1h");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbws4Ro0Ua0oRBasDTjSwm-1grbunzVsls-bv2a10mbLWml0otazBrC6RGKjq68XxA0-/exec";

  const deals = [
    {
      id: 1,
      title: "Deal No 1",
      price: 100,
      description: "Get 1,000 Likes and 20,000 Views",
      details: ["1,000 Likes", "20,000 Views", "2,000 Shares"],
    },
    {
      id: 2,
      title: "Deal No 2",
      price: 199,
      description: "Get 2,000 Likes, 40,000 Views, and 5,000 Shares",
      details: ["2,000 Likes", "40,000 Views", "5,000 Shares"],
    },
    {
      id: 3,
      title: "Deal No 3",
      price: 499,
      description: "Get 5,000 Likes, 100,000 Views, and 20,000 Shares",
      details: ["5,000 Likes", "100,000 Views", "20,000 Shares"],
    },
  ];

  const openModal = (deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDeal(null);
    setFormData({ name: "", videolink: "", transactionId: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    for (const field in formData) {
      if (formData[field].trim() === "") {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        );
        return false;
      }
    }
    if (formData.transactionId.length !== 11) {
      toast.error("Transaction ID must be exactly 11 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      ...formData,
      dealTitle: selectedDeal.title,
      price: selectedDeal.price,
      date: new Date().toISOString(),
      createdAt: new Date().getTime(),
      status: "pending",
    };

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(orderData),
      });

      // Save order to local storage
      const currentOrders = JSON.parse(localStorage.getItem("orders")) || [];
      currentOrders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(currentOrders));

      // Send Email Notification
      const templateParams = {
        to_name: orderData.name,
        from_name: `${formData.name}`, // Change this to your name or business
        message: `New order received:\n Deal: ${orderData.dealTitle}\nPrice: Rs ${orderData.price}\n videolink: ${formData.videolink}\nTransaction ID: ${orderData.transactionId}`,
        reply_to: "riyanghouri7@gmail.com", // Change to your email
      };

      emailjs
        .send("default_service", "template_p3mf13f", templateParams)
        .then(() => {
          console.log("Email notification sent!");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

      toast.success("Order successfully placed!");
      closeModal();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />
      <h2 className="mb-8 text-4xl font-bold text-center">Deals</h2>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {deals.map((deal) => (
          <div key={deal.id} className="flex-1 p-4 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold">{deal.title}</h3>
            <p className="text-2xl font-bold text-blue-600">Rs {deal.price}</p>
            <p className="mt-2">{deal.description}</p>
            <ul className="mt-4 list-disc list-inside">
              {deal.details.map((detail, index) => (
                <li key={index}>✔️ {detail}</li>
              ))}
            </ul>
            <button
              onClick={() => openModal(deal)}
              className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
      <h3 className="mt-10 text-2xl font-bold text-center">
        More deals coming soon!
      </h3>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
            <h2 className="text-xl font-bold text-center">
              Order {selectedDeal.title}
            </h2>
            <p className="mt-2 font-semibold text-center text-blue-600">
              Rs {selectedDeal.price}
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Video Link</label>
                <input
                  type="text"
                  name="videolink"
                  value={formData.videolink}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your video link"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter transaction ID"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Confirm Order
              </button>
            </form>
            <button
              onClick={closeModal}
              className="w-full px-4 py-2 mt-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricingPage;
