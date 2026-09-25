"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  membershipTier?: string;
  role?: "customer" | "admin";
  memberSince?: string;
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  birthday?: string;
  gender?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updated: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        if (data.user) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userProfile", JSON.stringify(data.user));
        } else {
          localStorage.removeItem("isLoggedIn");
        }
      } else {
        setUser(null);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (err) {
      console.error("Failed to fetch session:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void refreshUser(), 0);

    const handleAuthChange = () => {
      refreshUser();
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed." };
      }

      setUser(data.user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userProfile", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChanged"));
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const signup = async (payload: SignupPayload) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Signup failed." };
      }

      setUser(data.user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userProfile", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChanged"));
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout request error:", e);
    } finally {
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      window.dispatchEvent(new Event("authChanged"));
      router.push("/account/login");
    }
  };

  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    const merged = { ...user, ...updated };
    setUser(merged);
    localStorage.setItem("userProfile", JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
