
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Role = "admin" | "customer";

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const mockUsers = [
  { id: "1", email: "admin@tasc.com", password: "admin123", name: "Admin User", role: "admin" as Role },
  { id: "2", email: "customer1@example.com", password: "customer123", name: "John Smith", role: "customer" as Role },
  { id: "3", email: "customer2@example.com", password: "customer123", name: "Emily Johnson", role: "customer" as Role },
  { id: "4", email: "customer3@example.com", password: "customer123", name: "Michael Brown", role: "customer" as Role },
  { id: "5", email: "customer4@example.com", password: "customer123", name: "Sarah Wilson", role: "customer" as Role },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("tasc_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("tasc_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const userInfo = {
          id: foundUser.id,
          name: foundUser.name,
          role: foundUser.role,
        };
        
        setUser(userInfo);
        localStorage.setItem("tasc_user", JSON.stringify(userInfo));
        
        toast.success(`Welcome back, ${userInfo.name}!`);
        
        // Redirect based on role
        if (foundUser.role === "admin") {
          navigate("/analytics");
        } else {
          navigate("/survey");
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tasc_user");
    toast.info("You have been logged out");
    navigate("/");
  };

  const hasRole = (role: Role) => {
    return user?.role === role;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
