// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import './styles/global.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* <-- 2. WRAP YOUR APP WITH IT */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);