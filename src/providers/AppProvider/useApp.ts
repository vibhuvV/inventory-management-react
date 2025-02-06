import { use } from "react";
import { appContext } from "./AppContext";

const useApp = () => {
  const context = use(appContext);

  if (!context) {
    throw new Error("useApp should be used inside AppProvider");
  }

  return context;
};

export default useApp;
