import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [requireLoginAlert, setRequireLoginAlert] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, requireLoginAlert, setRequireLoginAlert }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;