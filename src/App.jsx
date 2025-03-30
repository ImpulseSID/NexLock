import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Save from "./pages/Save";
import Account from "./pages/Account";
import View from "./pages/View";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Generate" element={<Generate />} />
        <Route path="/Save" element={<Save />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/View" element={<View />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
