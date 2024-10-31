import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ServicesPage from "./components/ServicesPage";
import PricingPage from "./components/PricingPage";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import OrderPage from "./components/OrderPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/log" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
