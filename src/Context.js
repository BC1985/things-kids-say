import React, { useState, useEffect, createContext } from "react";
import { apiService, baseUrl } from "./Services/apiServices";
require("dotenv").config();

const context = createContext();

function ContextProvider({ children }) {
  const [sayings, setSayings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const uri = `${baseUrl}/sayings/all`;
  // fetch data from api
  const fetchData = async () => {
    setIsLoading(true);
  try {
      const res = await fetch(uri);
      const data = await res.json()

      setSayings(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchUsername = async () => {
    const res = await apiService.getUserObject();
    if (res === undefined) {
      return null;
    } else {
      setUser(res);
    }
  };

  return (
    <context.Provider value={{ sayings, isLoading, user, fetchUsername, fetchData }}>
      {children}
    </context.Provider>
  );
}
export { ContextProvider, context };
