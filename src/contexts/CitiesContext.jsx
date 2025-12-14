import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";

const BASE_URL = "https://fgouvennngidagsjyvfh.supabase.co";
const API_KEY = "sb_publishable_S_KxayLuGkCpEDWuSxq9Uw_RxYKN7fe";

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
        cities: [action.payload, ...state.cities],
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
        const res = await fetch(`${BASE_URL}/rest/v1/cities`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            apikey: `${API_KEY}`,
          },
        });
        const data = await res.json();
        console.log("cities", data);
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
      const res = await fetch(`${BASE_URL}/rest/v1/cities?id=eq.${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          apikey: `${API_KEY}`,
        },
      });
      const data = await res.json();
      console.log("id ye uygun", data);
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
      const res = await fetch(`${BASE_URL}/rest/v1/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          Prefer: "return=representation",
        },
      });

      const data = await res.json();
      console.log("yuklenen data create", data);

      const newCityData =
        Array.isArray(data) && data.length > 0 ? data[0] : data;

      dispatch({ type: "city/created", payload: newCityData });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "finally" });
    }
  }

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/rest/v1/cities?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const filter = cities.filter((city) => city.id !== id);

      dispatch({ type: "city/deleted", payload: filter });
    } catch (error) {
      console.log("Şehir silinirken hata oluştu:", error);
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
