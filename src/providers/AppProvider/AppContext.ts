import { createContext } from "react";

export type UserType = "admin" | "user";

interface AppContextValues {
  userType: UserType;
  setUserType: (currentUserType: UserType) => void;
}

export const appContext = createContext<AppContextValues>({
  userType: "user",
  setUserType: () => {},
});
