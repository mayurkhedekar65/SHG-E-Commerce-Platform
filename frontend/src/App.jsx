import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import RegistrationForm from "./pages/RegistrationForm";
import ShgGroups from "./pages/ShgGroups";
import Products from "./pages/Products";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/registrationform" element={<RegistrationForm/>}/>
          <Route path="/snggroups" element={<ShgGroups/>}/>
          <Route path="/products" element={<Products/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
