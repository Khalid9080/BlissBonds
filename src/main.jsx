import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './Routes/Router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import AuthProvider from './Providers/AuthProvider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  HelmetProvider } from 'react-helmet-async';

// Create an instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  </HelmetProvider>
);
