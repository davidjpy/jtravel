import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Sidebar from './global/Sidebar';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import NavigationPage from '../pages/NavigationPage';
import { AuthProvider } from '../context/AuthContext';
import RequireAuth from '../utils/RequireAuth';
import PersistLogin from '../utils/PersistLogin';

function App() {

  const [appTheme, setAppTheme] = useState('light');

  const theme = createTheme({
    palette: {
      mode: appTheme,
    }
  });

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Sidebar appTheme={appTheme} setAppTheme={setAppTheme} />
            <Routes>
              <Route element={<PersistLogin />}>
                {/* Public Routes */}
                <Route path='' element={<NavigationPage />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                  <Route path='home/' element={<HomePage />} />
                  <Route path='profile/' element={<ProfilePage />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);