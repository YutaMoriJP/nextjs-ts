import { createContext, useContext, useEffect, useRef, useState } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";
import useOpen from "../useHooks/useOpen";
import usePrevious from "../useHooks/usePrevious";

const initialContextValue = {
  login: () => {},
  logout: () => {},
  onClose: () => {},
  user: null,
  authReady: false,
  message: "",
  open: false,
};

type AuthContextValue =
  | typeof initialContextValue
  | {
      login: () => void;
      logout: () => void;
      onClose: () => void;
      user: User;
      message: string;
      authReady: boolean;
      open: boolean;
    };

const AuthContext = createContext<AuthContextValue>(initialContextValue);

//custom useAuth hook, which allows for easier use of the Auth context
export const useAuth = () => useContext(AuthContext);

const AuthContextComponent = ({ children }) => {
  //stores user data when logged in
  const [user, setUser] = useState<User | null>(null);
  const previousUser = usePrevious(user);
  const [authReady, setAuthoReady] = useState(false);

  //controls message component when user logs in/out
  const { open, onClose, onOpen } = useOpen(false);
  //sets message to 'Logged in' and 'Logged out'
  const [message, setMessage] = useState<string>("");

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
    authReady,
    open,
    onClose,
    message,
    previousUser,
  };
  //prevents 'logged in' message from appearing in the initial page load when user is already logged in
  const initialLoginRef = useRef(true);

  useEffect((): (() => void) => {
    //called when user logs in, callback receives user object
    //which is set to the user state
    netlifyIdentity.on("login", user => {
      setUser(user);
      //closes login modal
      netlifyIdentity.close();
      //state update for <Message/>

      //prevents message component from rendering in initial render(s)
      if (!initialLoginRef.current) {
        onOpen();
        setMessage("Logged in");
      }
      initialLoginRef.current = false;
      console.log("logged in");
    });
    //called when user logs out, and user must be set to null again
    netlifyIdentity.on("logout", () => {
      setUser(null);
      //state update for <Message/>
      onOpen();
      setMessage("Logged out");
      console.log("logged out");
    });
    netlifyIdentity.on("init", user => {
      setUser(user);
      setAuthoReady(true);
      console.log("init event");
    });
    //initializes netlify identity when component is mounted
    netlifyIdentity.init();

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

export default AuthContextComponent;
