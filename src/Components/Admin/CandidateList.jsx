import { useState } from "react";

const CandidateList=()=> {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", party: "ABC", votes: 125 },
    { id: 2, name: "Jane Smith", party: "XYZ", votes: 90 },
  ]);

  const handleDelete = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Candidates</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700">
        + Add Candidate
      </button>

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
            <tr key={c.id}>
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
  );
}


export default CandidateList