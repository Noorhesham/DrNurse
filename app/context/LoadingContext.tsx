"use client";
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterChange: () => void;
}>({ isLoading: false, setIsLoading: () => {}, handleFilterChange: () => {} });

/*************  ✨ Codeium Command 🌟  *************/
const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFilterChange = () => {
    setIsLoading(true);
  };

  return (
    <LoadingContext.Provider value={{ setIsLoading, isLoading, handleFilterChange }}>
      {children}
    </LoadingContext.Provider>
  );
};
/******  9eea10b0-34d7-4c06-9405-1f7f9f3c0083  *******/
const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useLoading };
