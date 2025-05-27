// frontend/src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css'; // We'll create styles for this

function ProfilePage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // This case should ideally be handled by ProtectedRoute,
    // but as a fallback or if directly navigated when auth state is lost.
    return <p>Loading user profile or not logged in...</p>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {currentUser.name || 'N/A (Update Profile)'}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>User ID (Simulated):</strong> {currentUser.id}
          </p>
          <p>
            <strong>Roles (Simulated):</strong> {currentUser.roles ? currentUser.roles.join(', ') : 'N/A'}
          </p>
          {/* Add more profile information here later */}
        </div>
        {/* <button className="edit-profile-button">Edit Profile</button> */}
      </div>
    </div>
  );
}

export default ProfilePage;