
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call for authentication
      // In a real app, this would be a call to your backend API
      setTimeout(() => {
        // Mock user data
        const userData = {
          token: "mock-jwt-token",
          user: {
            id: "1",
            name: "John Doe",
            email: email,
            role: email.includes("admin") ? "admin" : 
                  email.includes("doctor") ? "doctor" : 
                  email.includes("nurse") ? "nurse" : "receptionist",
            department: "General"
          }
        };
        
        onLogin(userData);
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.user.name}!`,
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials"
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full"
        />
      </div>
      
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        <p>Use any of these demo accounts:</p>
        <p>admin@example.com / doctor@example.com</p>
        <p>nurse@example.com / receptionist@example.com</p>
        <p>(any password will work)</p>
      </div>
    </form>
  );
};

export default LoginForm;
