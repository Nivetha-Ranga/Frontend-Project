import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; 
import './App.css';
import Header from './components/Header';
import MainBoday from './components/MainBoday'; 
import Footer from './components/Footer';
import OrderDetails from './components/OrderDetails';
import filterSearch from './util/filterSearch';
import Login from './components/Login';
import Admin from './components/Admin';
import Signup from './components/SignUp';
import ProductCart from './components/ProductCart';
function App() {
  const [dairyData, setDairyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]); // Cart state to manage added items
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () =>{
    localStorage.removeItem('jwtToken'); 
    setIsLoggedIn(false);
  } 
    
  function searchHandler(e) {
    setSearchQuery(e.target.value);
  }
  const handleAdminLogin = () => setIsAdmin(true);
  const handleAdminLogout = () => setIsAdmin(false);
  const displaydata = filterSearch(dairyData, searchQuery);
  const url = "http://localhost:8081/product-app/get-products";
  useEffect(() => {
    const fetchData = () => {
        axios.get(url)
            .then(response => {
                setDairyData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };
    fetchData();
  }, []);
  return (
    <Router>
      <div className="App">
        <Header  isLoggedIn={isLoggedIn} onLogout={handleLogout} isAdmin={isAdmin} onAdminLogout={handleAdminLogout}/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MainBoday onSearch={searchHandler} searchText={searchQuery}  allData={displaydata}  isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/admin" element={<Admin onAdminLogin={handleAdminLogin}/>} /> */}
          <Route path="/order/:id" element={isLoggedIn ? <OrderDetails /> : <Navigate to="/login" />} />
          <Route path="/cart" element={ isLoggedIn ? <ProductCart /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;