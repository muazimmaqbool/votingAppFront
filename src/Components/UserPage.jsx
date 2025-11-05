import React from "react";
import { useAuth } from "../Context/AuthContext";

const UserPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl">Welcome User</h1>
      <p className="mt-2 text-lg">Hello, {user?.name} 👋</p>
    </div>
  );
};

export default UserPage;
