// frontend/src/pages/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  // We will build the form similar to LoginPage here later
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Create an Account</h2>
      <p>Registration form will be here soon!</p>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
export default RegisterPage;