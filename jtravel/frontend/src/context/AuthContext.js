import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [profileThread, setProfileThread] = useState();
  const [requireLoginAlert, setRequireLoginAlert] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, 
                                   requireLoginAlert, setRequireLoginAlert,
                                   profileThread, setProfileThread }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;