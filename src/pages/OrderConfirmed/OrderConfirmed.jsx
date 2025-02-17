import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmed.css";
import { assets } from "../../assets/assets"; // Ensure you have a green tick image in assets

const OrderConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <img src={assets.green} alt="Success" className="green-tick" />
      <h2>Order Confirmed!</h2>
      <p>Your order has been placed successfully.</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default OrderConfirmed;
