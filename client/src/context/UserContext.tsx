import { createContext, useState } from "react";

type AuthUser = {
  username: string;
  user_id: number;
};

export type UserContextType = {
  user: any;
  setUser: any;
  authenticated: any;
  setAuthenticated: any;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
