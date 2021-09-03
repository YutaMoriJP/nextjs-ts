import { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";

const initialContextValue = {
  user: undefined,
  login: () => {},
  logout: () => {},
  authReady: false,
  loading: true,
};

type AuthContextValue =
  | typeof initialContextValue
  | {
      user: User;
      login: () => {};
      logout: () => {};
      authReady: false;
      loading: false;
    };

const AuthContext = createContext<AuthContextValue>(initialContextValue);

const AuthContextComponent = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  console.log("AuthContextComponent", user);

  const login = () => {
    netlifyIdentity.open();
  };
  const logout = () => {
    netlifyIdentity.logout();
  };

  const contextValues = { user, login, logout, authReady: false, loading };

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
    setLoading(false);
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextComponent;
