// src/app/routes/login.tsx
import Login from '@/components/pages/Login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Login,
  validateSearch: (search) => ({
    callback: search.callback as boolean,
  }),
});
