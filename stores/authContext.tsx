import { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

const initialContextValue = {
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
};

type AuthContextValue = typeof initialContextValue;

const AuthContext = createContext<AuthContextValue>(initialContextValue);

const AuthContextComponent = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect((): (() => void) => {
    netlifyIdentity.on("login", user => {
      console.log("logged in");
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on("logout", () => {
      console.log("logged out");
      setUser(null);
    });
    netlifyIdentity.init();
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };
  const logout = () => {
    netlifyIdentity.logout();
  };

  const contextValues = { user, login, logout, authReady: false };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextComponent;
