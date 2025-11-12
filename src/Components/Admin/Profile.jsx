import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function Profile() {
  const { user} = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    aadhar: user?.aadhar || "",
    role: user?.role || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
   // setUser(editData); // update user in context
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="bg-white shadow p-6 rounded-lg space-y-3">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Age:</strong> {user?.age}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
        <p><strong>Address:</strong> {user?.address}</p>
        <p><strong>Aadhaar Card:</strong> {user?.aadhar}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
              Edit Profile
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={editData.age}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Aadhaar Card</label>
                <input
                  name="aadhar"
                  value={editData.aadhar}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Role</label>
                <input
                  name="role"
                  value={editData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  readOnly
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>

            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
