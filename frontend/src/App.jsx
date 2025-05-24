// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from "./pages/NotFoundPage";
import ViewIssuesPage from "./pages/ViewIssuesPage";
import Navbar from './components/common/Navbar';
function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will now appear on all pages defined within Routes */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/issues" element={<ViewIssuesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;