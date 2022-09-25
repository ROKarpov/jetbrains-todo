import React, { useContext } from "react";

export type ContextContent = {
  setAlert: (message: string) => void;
};

const MainLayoutContext = React.createContext<ContextContent | null>(null);

export const useMainLayoutContext = () => {
  const context = useContext(MainLayoutContext);
  if (context === null || context === undefined) {
    throw "Cannot be used outside of MainLayout.";
  }
  return context;
};
export default MainLayoutContext;
