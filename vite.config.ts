import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // must come before react()
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/app/routes', // point to your folder if not on src root
      generatedRouteTree: './src/app/routeTree.gen.ts', // where to output the generated tree
    }),
    react(),
    tsconfigPaths(), // automatically uses tsconfig paths
  ],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'), // not needed if tsconfigPaths() covers it
    },
  },
});
