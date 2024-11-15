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
const initialState = {
  cities: [],
  isLoading : false,
  currentCity: {},
  error: ""
}
const reducer = (state, action) => {
  switch(action.type){
    case 'loading':
      return {
        ...state,
        isLoading : true
      }
    case 'cities/loaded':
      return {
        ...state,
        isLoading:false,
        cities: action.payload

      }
    case'city/loaded':
      return {
        ...state,
        isLoading:false,
        currentCity: action.payload
        }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity : {}
      }
    case 'rejected':
        return {
          ...state,
          isLoading:false,
          error: action.payload
        }
    default:
      throw new Error("unknown actio type")


  }
}

function CitiesProvider({ children }) {

  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)

 

  async function fetchCities() {
    dispatch({type: 'loading'});
    try {
      
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      console.log("here")
      dispatch({type: 'cities/loaded', payload:data})
      
    } catch {
      dispatch({type:'rejected', payload:'There was an error loading data...'})
    }
  }

  useEffect(function () {
    fetchCities();
  }, []);

  function getCity(id){
    if(Number(id) === Number(currentCity.id)) return
    async function fetchCities() {
      try {
        dispatch({type: 'loading'});
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({type: 'city/loaded', payload:data});
      } catch {
        dispatch({type:'rejected', payload:'Error while fetching'})
      }
    }
    fetchCities()
  }

  function createCity(newCity){
    async function fetchCities() {
      try {
        dispatch({type: 'loading'});
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
       dispatch({type: 'city/created', payload: data,})

      } catch {
        dispatch({type:'rejected', payload:"Error While Creating City"})
      }
    }
    fetchCities()
  }

  function deleteCity(id){
    async function fetchCities() {
      dispatch({type: "loading"})
      try {
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: 'DELETE'
        });
      dispatch({type: "city/deleted", payload: id})        
      } catch {
        dispatch({type:'rejected', payload:"Error While Deleting The City"})
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
        createCity,
        deleteCity,
        error
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