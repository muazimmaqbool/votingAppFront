import { useAuth } from "../../Context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="bg-white shadow p-4 rounded">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  );
}
