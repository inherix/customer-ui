import { createContext, useContext, useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadUser = async () => {
    try {
      const session = await fetchAuthSession();

      if (!session.tokens || !session.tokens.idToken) {
        console.log("No idToken → user null");
        setUser(null);
        return;
      }

      setUser({
        email: session.tokens.idToken.payload.email,
        token: session.tokens.idToken.toString(),
        firstName: session.tokens.idToken.payload.given_name,
      });
    } catch (err) {
      console.log("Fetch session failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loadUser, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
