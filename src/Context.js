import React, { useState, useEffect, createContext } from "react";
import { apiService, baseUrl } from "./Services/apiServices";
require("dotenv").config();

const context = createContext();

function ContextProvider({ children }) {
  const [sayings, setSayings] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const uri = `${baseUrl}/sayings?page=${page}`;
  // fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
    try {
        const res = await fetch(uri);

        const { data, pages: totalPages } = await res.json()

        setPages(totalPages);
        setSayings(data);
        setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
    fetchData();
  }, [page]);

  const fetchUsername = async () => {
    const res = await apiService.getUserObject();
    if (res === undefined) {
      return null;
    } else {
      setUser(res);
    }
  };

  return (
    <context.Provider value={{ sayings, isLoading, user, setPage, fetchUsername, page, pages,setPages }}>
      {children}
    </context.Provider>
  );
}
export { ContextProvider, context };
