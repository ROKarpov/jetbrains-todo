import React, { useContext } from "react";

const MainLayoutContext = React.createContext(0);

export const useMainLayoutContext = () => {
  const context = useContext(MainLayoutContext);
  if (context === null || context === undefined) {
    throw "Cannot be used outside of MainLayout.";
  }
  return context;
};
export default MainLayoutContext;
