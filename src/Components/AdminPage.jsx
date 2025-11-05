import React from 'react'
import { useAuth } from '../Context/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl">Admin Dashboard</h1>
      <p className="mt-2 text-lg">Welcome, {user?.name} 👑</p>
    </div>
  );
}

export default AdminPage