import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [currentView, setCurrentView] = useState('thread')
  const [profileThread, setProfileThread] = useState();
  const [requireLoginAlert, setRequireLoginAlert] = useState(false);
  const [profileThreadCounter, setProfileThreadCounter] = useState(0)

  return (
    <AuthContext.Provider value={{ auth, setAuth, 
                                   currentView, setCurrentView,
                                   requireLoginAlert, setRequireLoginAlert,
                                   profileThread, setProfileThread,
                                   profileThreadCounter, setProfileThreadCounter }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;