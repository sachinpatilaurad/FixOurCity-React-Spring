// frontend/src/components/routing/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Option 1: Component receives the component to render as a prop
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, isLoading } = useAuth();
// ...
//   return <Component {...rest} />;
// };

// Option 2 (More common with React Router v6): Using <Outlet /> for nested routes
// This is more flexible if your protected route itself might have child routes.
// Or simply, if you pass the element directly in the <Route element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
// For our case, let's use a simpler version for a direct page component.

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // Get current location

  if (isLoading) {
    // Show a loading indicator while checking authentication status
    // This prevents a flicker to the login page if the user is actually logged in
    // but the AuthContext is still initializing.
    return <div>Loading authentication status...</div>; // Or a proper spinner component
  }

  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    // Pass the current location in state so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the child components (the protected page)
  return children; // In React Router v6, <Outlet /> is often used here if it's a layout route.
                   // For a simple wrapper like this, `children` works well if you pass the component as a child.
};

// Alternative for passing element directly:
// const ProtectedRoute = ({ element: ElementToRender }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) return <div>Loading...</div>;
//   if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
//   return ElementToRender;
// }


export default ProtectedRoute;