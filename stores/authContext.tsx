import { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";
import useOpen from "../useHooks/useOpen";

const initialContextValue = {
  login: () => {},
  logout: () => {},
  onClose: () => {},
  user: undefined,
  authReady: false,
  loading: true,
  message: "",
  open: false,
};

type AuthContextValue =
  | typeof initialContextValue
  | (typeof initialContextValue & {
      user: User;
      login: () => {};
      logout: () => {};
      authReady: false;
      loading: false;
    });

const AuthContext = createContext<AuthContextValue>(initialContextValue);

const AuthContextComponent = ({ children }) => {
  //stores user data when logged in
  const [user, setUser] = useState<User>(null);
  //controls initial login/logout button, as user data is loaded asynchronously
  const [loading, setLoading] = useState(true);
  //controls message component when user logs in/out
  const { open, onClose, onOpen } = useOpen(false);
  //sets message to 'Logged in' and 'Logged out'
  const [message, setMessage] = useState<string>("");

  console.log("AuthContextComponent", user);

  const login = () => {
    netlifyIdentity.open();
  };
  const logout = () => {
    netlifyIdentity.logout();
  };

  const contextValues = {
    user,
    login,
    logout,
    authReady: false,
    loading,
    open,
    onClose,
    message,
  };

  useEffect((): (() => void) => {
    //called when user logs in, callback receives user object
    //which is set to the user state
    netlifyIdentity.on("login", user => {
      console.log("logged in");
      setUser(user);
      //closes login modal
      netlifyIdentity.close();
      //state update for <Message/>
      onOpen();
      setMessage("Logged in");
    });
    //called when user logs out, and user must be set to null again
    netlifyIdentity.on("logout", () => {
      console.log("logged out");
      setUser(null);
      //state update for <Message/>
      onOpen();
      setMessage("Logged out");
    });
    //initializes netlify identity when component is mounted
    netlifyIdentity.init();
    //useEffect runs AFTER components have mounted
    //so user is NOT initialied on the beginning
    //which means, we don't know whether the user is logged in or not
    //so we control it is with a loading state to handle this asynchronous task
    setLoading(false);

    //cleanup
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
//custom useAuth hook, which allows for easier use of the Auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContextComponent;
