import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";

const BASE_URL = "http://localhost:5000";

const CitiesContexts = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    //......................................................
    case "loading":
      return { ...state, isLoading: true };
    //......................................................
    case "loaded/cities":
      return { ...state, cities: action.payload };

    //......................................................
    case "loaded/city":
      return {
        ...state,
        currentCity: action.payload,
      };
    //.....................................................

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };

    //....................................................

    case "city/deleted":
      return {
        ...state,
        cities: action.payload,
      };

    //....................................................
    case "finally":
      return {
        ...state,
        isLoading: false,
      };
    //....................................................
    default:
      return state;
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "loaded/cities", payload: data });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "finally" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "loaded/city", payload: data });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "finally" });
    }
  }

  async function createCityAddApi(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "finally" });
    }
  }

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      const data = await res.json();

      const filter = cities.filter((city) => city.id !== data.id);

      dispatch({ type: "city/deleted", payload: filter });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "finally" });
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
