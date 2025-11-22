import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { getProfile } from "../../APICalls/userApi";

export default function Profile() {
  const { jwtToken } = useAuth();
  const [profile, setprofile] = useState();
  useEffect(() => {
    if (jwtToken) {
      getProfile(jwtToken, setprofile);
    }
  }, [jwtToken]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile?.name || "",
        age: profile?.age || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        address: profile?.address || "",
        aadharCardNumber: profile?.aadharCardNumber || "",
        role: profile?.role || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  // console.log("editData:",editData)
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="bg-white shadow p-6 rounded-lg space-y-3">
        <p>
          <strong>Name:</strong> {profile?.name}
        </p>
        <p>
          <strong>Age:</strong> {profile?.age}
        </p>
        <p>
          <strong>Email:</strong> {profile?.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile?.phone}
        </p>
        <p>
          <strong>Address:</strong> {profile?.address}
        </p>
        <p>
          <strong>Aadhaar Card:</strong> {profile?.aadharCardNumber}
        </p>
        <p>
          <strong>Role:</strong> {profile?.role}
        </p>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20 ">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative h-[90%] overflow-auto">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
              Edit Profile
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
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
                  type="number"
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
                  type="number"
                  name="aadhar"
                  value={editData.aadharCardNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>

            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
