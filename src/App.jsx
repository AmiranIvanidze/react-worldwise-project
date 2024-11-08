import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={ <HomePage/> }/>
            <Route path="product" element={ <Product/> }/>
            <Route path="pricing" element={ <Pricing/> }/>
            
            <Route path="app" element={ <AppLayout/> } >
              <Route index element={<p>List Of Cities</p>}/>
              <Route path="cities" element={ <p>List OF Cities</p> }/>
              <Route path="countries" element={ <p>List OF Countries</p> }/>
              <Route path="form" element={ <p>List OF Forms</p> }/>
            </Route>

            <Route path="login" element={ <Login/> }/>
            <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
    </BrowserRouter>
    
  )
}

export default App;