// Import required libraries and components
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // For data fetching and caching
import { RouterProvider } from '@tanstack/react-router'; // For routing
import React from 'react';
import { createRoot } from 'react-dom/client'; // For rendering React app
import { Toaster } from 'react-hot-toast'; // For toast notifications
import 'react-lazy-load-image-component/src/effects/blur.css'; // For image blur effect
import App from './App'; // Main App component
import router from './app/router'; // App router configuration
import './index.css'; // Tailwind CSS styles

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

// Render the React application to the DOM
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide React Query client to the app */}
    <QueryClientProvider client={queryClient}>
      {/* Main App layout */}
      <App>
        {/* Provide router for navigation */}
        <RouterProvider router={router} />
        {/* Toast notifications at the top center */}
        <Toaster position="top-center" reverseOrder={false} />
      </App>
    </QueryClientProvider>
  </React.StrictMode>
);
