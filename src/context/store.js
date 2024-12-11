import React, { createContext, useState } from "react";
import { productVariation } from "@/constant/data";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [currentVariation, setCurrentVariation] = useState(productVariation[0]);
  const [currentRotation, setCurrentRotation] = useState(180);
  return (
    <StoreContext.Provider
      value={{
        currentVariation,
        setCurrentVariation,
        currentRotation,
        setCurrentRotation,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
