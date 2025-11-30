import { useEffect, useState } from "react";
import {
  addCandidate,
  deleteCandidate,
  getAllCandidates,
  updateCandidate,
} from "../../APICalls/candidates";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../Loader";

const CandidateList = () => {
  const { jwtToken } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [reload, setreload] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [deleteloader, setdeleteloader] = useState(false);
  useEffect(() => {
    if (jwtToken) {
      setshowConfirm(false);
      getAllCandidates(setCandidates, jwtToken, setisloading);
    }
  }, [jwtToken, reload]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const [candidateToDelete, setcandidateToDelete] = useState();
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    age: "",
    party: "",
  });
  const [editID, seteditID] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newCandidate.name || !newCandidate.age || !newCandidate.party) {
      alert("Please fill in all required fields!");
      return;
    }
    if (editID) {
      //updating existing candidate
      //updating api here
      // console.log("called...")
      const updateEntry = {
        name: newCandidate.name,
        age: newCandidate.age,
        party: newCandidate.party,
      };
      updateCandidate(updateEntry, editID, jwtToken, setreload,setisloading);
    } else {
      //adding new candidate
      const newEntry = {
        name: newCandidate.name,
        age: newCandidate.age,
        party: newCandidate.party,
      };
      addCandidate(newEntry, jwtToken, setreload,setisloading);
    }

    setNewCandidate({ name: "", party: "", votes: "" });
    seteditID(null);
    setIsModalOpen(false);
  };

  const handleEdit = (candidate) => {
    seteditID(candidate._id);
    setNewCandidate({
      name: candidate.name,
      age: candidate.age,
      party: candidate.party,
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    seteditID(null);
    setNewCandidate({ name: "", party: "", votes: "" });
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

      {isloading ? (
        <Loader/>
      ) : (
        <>
          {/* for mobile screens it will be hidden and visible in large screens only */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full border">
              {candidates && candidates?.length > 0 && (
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Age</th>
                    <th className="p-2 border">Party</th>
                    {/* <th className="p-2 border">Votes</th> */}
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {candidates.map((c, index) => (
                  <tr key={index} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{c.name}</td>
                    <td className="p-2 border">{c.age}</td>
                    <td className="p-2 border">{c.party}</td>
                    {/* <td className="p-2 border">{c.voteCount}</td> */}
                    <td className="p-2 border space-x-2">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setshowConfirm(true);
                          setcandidateToDelete(c);
                        }}
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
          <div className="md:hidden space-y-4 overflow-y-auto h-[80vh]">
            {candidates.map((c, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <p>
                  <span className="font-semibold">Name:</span> {c.name}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {c.age}
                </p>
                <p>
                  <span className="font-semibold">Party:</span> {c.party}
                </p>
                <p>
                  <span className="font-semibold">Votes:</span> {c.voteCount}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setshowConfirm(true);
                      setcandidateToDelete(c);
                    }}
                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {candidates.length === 0 && (
            <div className="flex items-center justify-center mt-10">
              <p className="text-gray-400 font-semibold text-2xl">
                No Data Available
              </p>
            </div>
          )}
        </>
      )}

      {/* Modal to add new candidate */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          {/* the inset-0 utility class sets the top, right, bottom, and left properties of an element to 0 */}
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
              {editID ? "Edit Candidate" : "Add New Candidate"}
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
                <label className="block mb-1 font-medium">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={newCandidate.age}
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
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editID ? "Update" : "Add"}
                </button>
              </div>
            </form>

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Your Vote</h3>
            <p className="mb-4">
              Are you sure you want to delete <br />
              <span className="font-bold text-blue-700">
                {candidateToDelete?.name}
              </span>
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setshowConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteCandidate(candidateToDelete?._id, jwtToken, setreload,setdeleteloader)
                }
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {deleteloader ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
