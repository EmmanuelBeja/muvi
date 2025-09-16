import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import App from './App';
import router from './app/router';
import './index.css'; // Tailwind

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </App>
    </QueryClientProvider>
  </React.StrictMode>
);
