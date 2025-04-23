import { createBrowserRouter } from 'react-router';
import RootLayout from './RootLayout.jsx';
import ErrorPage from './ErrorPage.jsx';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/login/Login.jsx';
import Signup from '../pages/signup/Signup.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Favorites from '../pages/favorites/Favorites.jsx'
import AddContact from '../pages/addContact/AddContact.jsx'
import Profile from '../components/profile/Profile.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Layout wrapping the nested routes
    errorElement: <ErrorPage />, // Fallback for routing errors when not valid route
    children: [
      // Define individual routes for the application
      { index: true, element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/favorites',
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addcontact",
        element: (
          <ProtectedRoute>
            <AddContact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:contactId",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
