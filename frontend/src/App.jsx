// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from "./pages/NotFoundPage";
import ViewIssuesPage from "./pages/ViewIssuesPage";
import ProfilePage from "./pages/ProfilePage"; // Ensure this path is correct
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/routing/ProtectedRoute"; // Ensure this path is correct
// /Users/sachinpatil/fixourcity-app/frontend/src/routing
function App() {
  return (
    <Router>
      <Navbar />{" "}
      {/* Navbar will now appear on all pages defined within Routes */}
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/issues" element={<ViewIssuesPage />} />

          {/* Protected Route for Profile Page */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {" "}
                {/* This component checks authentication */}
                <ProfilePage />{" "}
                {/* This is the page to render if authenticated */}
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;