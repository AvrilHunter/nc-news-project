import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser("cooljmessy");
  }, [])
  
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
};
