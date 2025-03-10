import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
