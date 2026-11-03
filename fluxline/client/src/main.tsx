import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { IS_PREVIEW } from './lib/api';

const Router = IS_PREVIEW ? MemoryRouter : BrowserRouter;
import App from './App';
import { AuthProvider } from './lib/auth';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
);
