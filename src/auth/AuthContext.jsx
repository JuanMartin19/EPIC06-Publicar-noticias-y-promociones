import { createContext, useContext, useState, useEffect } from "react";
import { decodeToken, isTokenExpired } from "./jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromStorage = () => {
    const token = sessionStorage.getItem("access_token");

    if (!token || isTokenExpired(token)) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      setUser(null);
      setLoading(false);
      return;
    }

    const decoded = decodeToken(token);
    setUser({
      username: decoded.sub,
      roles: decoded.roles || [],
    });
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("pkce_verifier");
    sessionStorage.removeItem("oauth_state");
    setUser(null);

    // Cierra también la sesión del backend (Spring), no solo el token local
    window.location.href = "http://localhost:9000/logout";
  };

  const isAdmin = () => user?.roles?.includes("ROLE_ADMIN");

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}