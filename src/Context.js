import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { apiService } from "./Services/apiServices";
require("dotenv").config();

const context = createContext();

function ContextProvider({ children }) {
  const [sayings, setSayings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const uri = "http://localhost:5000/sayings";

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

  const fetchUsername = async () => {
    const res = await apiService.getUserObject();
    if (res === undefined) {
      return null;
    } else {
      setUser(res);
    }
  };

  return (
    <context.Provider value={{ sayings, isLoading, user, fetchUsername }}>
      {children}
    </context.Provider>
  );
}
export { ContextProvider, context };
