import React from 'react';
import "./FrontPage.css";
import background_img from "./IMG/stock-market.jpg"

const FrontPage = (props) => {
  return (  
    <div className="front-page-container" style={{ backgroundImage: `url(${background_img})`}}>
      <h2 className="front-page-title">"BIG BOARD"</h2>
      <p className="front-page-content">Stay updated with the latest stock prices and trends.</p>
      <button className="front-page-button " onClick={() => {props.method()}}>Sign in with Google 🚀</button>
      <div className="footer">
        <p>&copy; 2023 Stock Market Price Listing. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FrontPage;
