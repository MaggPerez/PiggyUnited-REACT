import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './login.css'
import './style.css'
import App from './pages/App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx'
import Checkings from './pages/Checkings.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/dashboard',
  element: <Dashboard />,
},
{
  path: '/checkings',
  element: <Checkings />
}

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
