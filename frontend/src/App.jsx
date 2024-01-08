import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home.jsx';
import { useState,useEffect } from "react";
import { useSelector } from 'react-redux';
import ProductDetails from "./Pages/ProductDetails.jsx";
import FilterProduct from "./components/FilterProduts.jsx";
import SearchResult from "./components/SearchResult.jsx";


function App() {

  const [userjwtToken, setJwtToken] = useState("");

  const auth = useSelector((state) => state.user?.token);

  useEffect(() => {
    setJwtToken(auth);
  }, [auth,]);

  return (
   <div className="app"> 
    <BrowserRouter>
    
      <Routes>
       
        <Route path="/" element={userjwtToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/productdetails/:productId" element={userjwtToken ? <ProductDetails /> : <Navigate to="/login" />} />
        <Route path="/searchresult/" element={userjwtToken ? <SearchResult /> : <Navigate to="/login" />} />
        <Route path="/filterproducts/" element={userjwtToken ? <FilterProduct /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userjwtToken ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userjwtToken ? <Signup /> : <Navigate to="/" />} />

       
      </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App
