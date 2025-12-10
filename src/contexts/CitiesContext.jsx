import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000";

const CitiesContexts = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrencyCity] = useState({});

  console.log(cities);

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrencyCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCityAddApi(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "aplication/json",
        },
      });

      const data = await res.json();
      setCities((prew) => [...prew, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      const data = await res.json();

      const filter = cities.filter((city) => city.id !== data.id);

      setCities(filter);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContexts.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCityAddApi,
        deleteCity,
      }}
    >
      {children}
    </CitiesContexts.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContexts);

  if (context === undefined) {
    throw new Error("Cities yoxdur !!!");
  }
  return context;
};

export { useCities, CitiesProvider };
