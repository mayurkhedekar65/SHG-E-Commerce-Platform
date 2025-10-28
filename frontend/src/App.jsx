import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import RegistrationForm from "./pages/RegistrationForm";
import ShgGroups from "./pages/ShgGroups";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrationform" element={<RegistrationForm />} />
          <Route path="/snggroups" element={<ShgGroups />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
