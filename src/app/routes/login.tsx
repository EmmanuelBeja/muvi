// src/app/routes/login.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: () => <>Login</>,
});
