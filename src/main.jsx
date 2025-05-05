import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"; // ✅ Import Tailwind CSS

import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]';
import MyTrips from './my-trips';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  }, {
    path: '/view-trip/:tripId',
    element: <ViewTrip />
  }, {
    path: '/my-trips',
    element: <MyTrips />
  }
])

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
console.log("clientId", clientId)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
