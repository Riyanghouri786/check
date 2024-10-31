import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    videoLink: "",
    orderType: "",
    requirements: "",
    amount: "",
    trxId: "",
  });

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbws4Ro0Ua0oRBasDTjSwm-1grbunzVsls-bv2a10mbLWml0otazBrC6RGKjq68XxA0-/exec";

  // Pricing information
  const prices = {
    followers: 499 / 1000,
    views: 3 / 1000,
    likes: 50 / 1000,
  };

  // Calculate total price based on order type and amount
  const calculateTotal = () => {
    const pricePerUnit = prices[formData.orderType] || 0;
    const total = formData.amount ? formData.amount * pricePerUnit : 0;
    return total.toFixed(2);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const minAmounts = { followers: 1000, views: 10000, likes: 1000 };

    // Check for empty fields
    for (const field in formData) {
      if (formData[field].trim() === "") {
        toast.error(`${capitalizeFirstLetter(field)} is required.`);
        return false;
      }
    }

    // Check transaction ID length
    if (formData.trxId.length !== 11) {
      toast.error("Transaction ID must be exactly 11 characters long.");
      return false;
    }

    // Check minimum amounts
    if (
      minAmounts[formData.orderType] &&
      parseInt(formData.amount) < minAmounts[formData.orderType]
    ) {
      toast.error(
        `Minimum amount for ${formData.orderType} is ${
          minAmounts[formData.orderType]
        }.`
      );
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        toast.success("Your order has been submitted!");
      })
      .catch((error) => {
        console.error("Error!", error.message);
        toast.error("Failed to submit the order. Please try again.");
      });

    // Reset form data after submission
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      name: "",
      videoLink: "",
      orderType: "",
      requirements: "",
      amount: "",
      trxId: "",
    });
  };

  // Function to copy the account number to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("03079171389")
      .then(() => {
        toast.success("Account number copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy account number.");
      });
  };

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Place Your Order
        </h2>

        {/* Account Information Section */}
        <div className="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
          <h3 className="text-lg font-semibold">Payment Information</h3>
          <p className="mt-2">
            Payment Method: <strong>Easypaisa</strong>
          </p>
          <p>
            Account Number:{" "}
            <strong
              onClick={copyToClipboard}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              03079171389
            </strong>
          </p>
          <p>
            Account Name: <strong>Bushra Hashmat</strong>
          </p>
          <p className="mt-2">
            Send money to this number and add the transaction ID in the ID
            field.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/** Input Fields */}
          <InputField
            label="Your Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Order Type"
            type="select"
            name="orderType"
            value={formData.orderType}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Order Type" },
              { value: "followers", label: "Increase Followers" },
              { value: "views", label: "Boost Views" },
              { value: "likes", label: "Gain Likes" },
            ]}
            required
          />
          <InputField
            label="Video Link"
            type="url"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Transaction ID"
            type="text"
            name="trxId"
            value={formData.trxId}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Additional Requirements"
            type="textarea"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
          />

          <div className="text-lg font-semibold text-center">
            Total Price: Rs {calculateTotal()}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit Order
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  options,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="3"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={`Enter your ${label.toLowerCase()}`}
          aria-label={label}
        />
      )}
    </div>
  );
};

export default OrderForm;
