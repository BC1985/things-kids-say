import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
require('dotenv').config()

const context = createContext();

function ContextProvider({ children }) {
  const [sayings, setSayings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const uri = `${process.env.CONNECTION_URI}/sayings`;

  // fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(uri);
      setSayings(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <context.Provider value={{ sayings, isLoading }}>
      {children}
    </context.Provider>
  );
}
export { ContextProvider, context };
