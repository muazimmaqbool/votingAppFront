import { useState } from "react";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", party: "ABC", votes: 125 },
    { id: 2, name: "Jane Smith", party: "XYZ", votes: 90 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    party: "",
    votes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newCandidate.name || !newCandidate.party) {
      alert("Please fill in all required fields!");
      return;
    }

    const newEntry = {
      id: candidates.length + 1,
      name: newCandidate.name,
      party: newCandidate.party,
      votes: Number(newCandidate.votes) || 0,
    };

    setCandidates((prev) => [...prev, newEntry]);
    setNewCandidate({ name: "", party: "", votes: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Manage Candidates</h2>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Candidate
      </button>

      {/* for mobile screens it will be hidden and visible in large screens only */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Party</th>
            <th className="p-2 border">Votes</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.party}</td>
              <td className="p-2 border">{c.votes}</td>
              <td className="p-2 border space-x-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* mobile : visible in small screen and hidden in large screens */}
      <div className="md:hidden space-y-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p>
              <span className="font-semibold">Name:</span> {c.name}
            </p>
            <p>
              <span className="font-semibold">Party:</span> {c.party}
            </p>
            <p>
              <span className="font-semibold">Votes:</span> {c.votes}
            </p>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to add new candidate */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          {/* the inset-0 utility class sets the top, right, bottom, and left properties of an element to 0 */}
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
              Add New Candidate
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newCandidate.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Party *</label>
                <input
                  type="text"
                  name="party"
                  value={newCandidate.party}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
