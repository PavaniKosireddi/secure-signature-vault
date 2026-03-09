import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { API_BASE_URL } from "@/config/api";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper: normalise backend user object → frontend User shape
// Backend returns `name`, frontend expects `username`
function normaliseUser(raw: any): User {
  return {
    id:       raw.id,
    username: raw.username ?? raw.name ?? raw.email?.split("@")[0] ?? "User",
    email:    raw.email,
    role:     raw.role ?? "user",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]           = useState<User | null>(null);
  const [token, setToken]         = useState<string | null>(() => localStorage.getItem("sigauth_token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(normaliseUser(data.user));
      } else {
        localStorage.removeItem("sigauth_token");
        setToken(null);
      }
    } catch {
      // Backend might be offline — keep existing state
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || "Login failed");
    setUser(normaliseUser(data.user));
    setToken(data.token);
    localStorage.setItem("sigauth_token", data.token);
  };

  const signup = async (username: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      // send both `name` and `username` so either backend field name works
      body: JSON.stringify({ name: username, username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || "Signup failed");
    setUser(normaliseUser(data.user));
    setToken(data.token);
    localStorage.setItem("sigauth_token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sigauth_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
