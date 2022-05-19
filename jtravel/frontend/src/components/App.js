import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Sidebar from './global/Sidebar';
import HomePage from '../pages/HomePage';
import NavigationPage from '../pages/NavigationPage';
import { AuthProvider } from '../context/AuthContext';
import RequireAuth from '../utils/RequireAuth';
import PersistLogin from '../utils/PersistLogin';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Sidebar />
          <Routes>
            {/* Public Routes */}
            <Route path='' element={<NavigationPage />} />

            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path='home/' element={<HomePage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);