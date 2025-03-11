import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Generate" element={<Generate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
