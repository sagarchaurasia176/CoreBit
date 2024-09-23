import React, { createContext, useState } from "react";
//create context there  => its used in all over the states , wherever you used
export const ContextCreation = createContext();
//This is provider
export const StataManage = ({children}) => {
  const [loading, setLoading] = useState(false);
  
  const values = {
    loading,
    setLoading,
  };
  return(
    <ContextCreation.Provider value={values}>
      {children}
    </ContextCreation.Provider>
  )
};
