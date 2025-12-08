import { createContext } from "react";
import { useState, useEffect } from "react";

const CitiesContexts = createContext();

const BASE_URL = "http://localhost:5000";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContexts.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContexts.Provider>
  );
};

export { CitiesContexts, CitiesProvider };
