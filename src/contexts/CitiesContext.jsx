import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();


function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, seIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);
  
  

  async function fetchCities() {
    seIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCities(data)
      seIsLoading(false)
    } catch {
      throw new Error("Error While Fetching");
    }
  }

  useEffect(function () {
    fetchCities();
  }, []);

  function getCity(id){
    async function fetchCities() {
      try {
        seIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data)
        seIsLoading(false)
      } catch {
        throw new Error("Error While Fetching");
      }
    }
    fetchCities()
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
