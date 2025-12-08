// Gerencia o token no LocalStorage e o estado de login do usuário/ONG.
import { useState, useEffect } from "react";
import { AuthContext } from "./authContextDef";

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setIsLogged(true);
        setUserType(userData.type);
        setUserId(userData.userId);
        setUserName(userData.userName);
      } catch (error) {
        console.error("Erro ao ler dados de autenticação:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (type, userId = null, userName = null) => {
    const userData = { type, userId, userName, loginAt: new Date().toISOString() };
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLogged(true);
    setUserType(type);
    setUserId(userId);
    setUserName(userName);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
    setUserType(null);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, userType, userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}