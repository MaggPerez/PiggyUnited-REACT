import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './login.css'
import './style.css'
import App from './pages/App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Checkings from './pages/Checkings.jsx';
import Savings from './pages/Savings.jsx'
import CD from './pages/CD.jsx'
import Account from './pages/Account.jsx'
import History from './pages/History.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/logout',
  element: <Login />
},
{
  path: '/dashboard',
  element: <Dashboard />,
},
{
  path: '/account',
  element: <Account />
},
{
  path: '/checkings',
  element: <Checkings />
},
{
  path: '/savings',
  element: <Savings />
},
{
  path: '/cd',
  element: <CD />
},
{
  path: 'history',
  element: <History />
}

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
