
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("hmsToken");
    const userData = localStorage.getItem("hmsUser");
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const handleLogin = (userData) => {
    localStorage.setItem("hmsToken", userData.token);
    localStorage.setItem("hmsUser", JSON.stringify(userData.user));
    setIsLoggedIn(true);
    setUser(userData.user);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("hmsToken");
    localStorage.removeItem("hmsUser");
    setIsLoggedIn(false);
    setUser(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-600">Health Nexus</h1>
              <p className="mt-2 text-gray-600">Hospital Management System</p>
            </div>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
