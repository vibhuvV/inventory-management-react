import { PropsWithChildren, useState } from "react";
import { type UserType, appContext } from "./AppContext";

const AppProvider = ({ children }: PropsWithChildren) => {
  const [userType, setUserType] = useState<UserType>("user");

  return (
    <appContext.Provider value={{ userType, setUserType }}>
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
