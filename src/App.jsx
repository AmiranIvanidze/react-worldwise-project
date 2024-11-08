import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = "http://localhost:9000"
const App = () => {

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCities(){
      try{
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }catch {
        console.error("Error occured in cities fetch")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, []);
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={ <HomePage/> }/>
            <Route path="product" element={ <Product/> }/>
            <Route path="pricing" element={ <Pricing/> }/>
            
            <Route path="app" element={ <AppLayout/> } >
              <Route index element={<p>List Of Cities</p>}/>
              <Route path="cities" element={ <CityList cities={cities} isLoading={isLoading} /> }/>
              <Route path="cities/:id" element={ <City /> }></Route>
              <Route path="countries" element={ <CountryList cities={cities} isLoading={isLoading} /> }/>
              <Route path="form" element={ <p>List OF Forms</p> }/>
            </Route>

            <Route path="login" element={ <Login/> }/>
            <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
    </BrowserRouter>
    
  )
}

export default App;