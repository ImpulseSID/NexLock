import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Save from "./pages/Save";
import Account from "./pages/Account";
import View from "./pages/View";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BootSplash from "./components/BootSplash";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BootSplash />
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Generate"
            element={
              <ProtectedRoute>
                <Generate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Save"
            element={
              <ProtectedRoute>
                <Save />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/View"
            element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
