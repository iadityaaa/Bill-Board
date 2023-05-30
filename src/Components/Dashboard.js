import React from "react";
//import "./Dashboard.css";

const Dashboard = (props) => {
  const whatsapp = () => {
    let stock_name = props.name;
    let close = props.value4;
    let url =
      "https://wa.me/?text=The%20value%20of%20" +
      stock_name +
      "%20stocks%20on%2015/05/2023%20is%20:%20$" +
      close +
      ".";
    window.open(url, "_blank").focus();
  };

  return (
    <div className="Dashboard">
      <div className="stock-price-container">
        <span className="stock-symbol">{props.name} Stock</span>
      </div>
      <div className="stock-price-container">
        <span className="stock-symbol">Open Value :</span>
        <span className="stock-price">$ {props.value1}</span>
      </div>
      <div className="stock-price-container">
        <span className="stock-symbol">High Value :</span>
        <span className="stock-price">$ {props.value2}</span>
      </div>
      <div className="stock-price-container">
        <span className="stock-symbol">Low Value :</span>
        <span className="stock-price">$ {props.value3}</span>
      </div>
      <div className="stock-price-container">
        <span className="stock-symbol">Close Value :</span>
        <span className="stock-price">$ {props.value4}</span>
      </div>
      <button className="whatsapp-button" onClick={whatsapp}>
        Share via WhatsApp
      </button>
    </div>
  );
};

export default Dashboard;
