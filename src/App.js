import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Dashboard from "./Components/Dashboard";
import FrontPage from "./Components/FrontPage";
import "./App.css"
//import bck from "./Components/IMG/wall-street-crash.jpg"
import bck from "./Components/IMG/giphy.gif"

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [stockData, setStockData] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // Function to get the desired name based on the symbol
  const getStockName = (symbol) => {
    // Mapping object to map symbol names to desired names
    const symbolNames = {
      IBM: 'International Business Machines (IBM)',
      AAPL: 'Apple Inc.',
      GOOGL: 'Alphabet Inc. (Google)',
      'SHOP.TRT': 'Shopify Inc.',
    };

    // Check if the symbol exists in the mapping object, return the corresponding name
    if (symbolNames.hasOwnProperty(symbol)) {
      return symbolNames[symbol];
    }

    // If the symbol is not found in the mapping object, return the symbol itself as the name
    return symbol;
  };

  useEffect(() => {
    if (user) {
      const stockSymbols = ['IBM', 'AAPL', 'GOOGL', 'SHOP.TRT'];
      
      Promise.all(
        stockSymbols.map((symbol) =>
          axios.get(`http://localhost:5000/api/stock-data?symbol=${symbol}`)
        )
      )
        .then((responses) => {
          const stockData = responses.map((res) => {
            const { symbol, open, close, high, low } = res.data;
            const name = getStockName(symbol); // Function to get the desired name based on the symbol

            return { symbol, name, open, close, high, low };
          });
          setProfile(responses[0].data);
          setStockData(stockData);
        })
        .catch((error) => console.log('Error:', error));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {user ? (
        profile && Object.keys(user).length > 0 ? (
          <div className="container">
            <h1 className="welcome"> WELCOME TO "BIG BOARD" : 15/05/2023 </h1>
            <div className="different_dashboards">
              {stockData.map((stock, index) => (
                <Dashboard
                  key={index}
                  id={index + 1}
                  name={getStockName(stock.symbol)}
                  value1={stock.open}
                  value2={stock.close}
                  value3={stock.high}
                  value4={stock.low}
                />
              ))}
            </div>
            <button className="logout" onClick={logOut}>
              Log out
            </button>
          </div>
        ) : (
          <FrontPage method={login} />
        )
      ) : (
        <FrontPage method={login} />
      )}
    </div>
  );
}

export default App;

