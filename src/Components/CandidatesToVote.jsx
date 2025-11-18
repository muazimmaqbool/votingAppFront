import React, { useState } from 'react'

const CandidatesToVote = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", party: "ABC" },
    { id: 2, name: "Jane Smith", party: "XYZ" },
    { id: 3, name: "Bilal Khan", party: "JKP" },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null); // who voter selected
  const [showConfirm, setShowConfirm] = useState(false); // modal
  const [votedCandidateId, setVotedCandidateId] = useState(null); // final vote

  const handleVoteClick = (candidate) => {
    // If already voted, do nothing
    if (votedCandidateId) return;
    setSelectedCandidate(candidate);
    setShowConfirm(true);
  };

  const confirmVote = () => {
    setVotedCandidateId(selectedCandidate.id);
    setShowConfirm(false);
  };

  return (
    <div>
      {/* Warning */}
      <div className="bg-yellow-200 text-yellow-800 border border-yellow-500 p-3 rounded mb-4">
        ⚠ Once you vote, you cannot undo or change your vote.
      </div>

      <h2 className="text-2xl font-bold mb-4">Candidates</h2>

      {/* Candidate List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 shadow rounded border"
          >
            <p className="font-semibold text-lg">{c.name}</p>
            <p className="text-gray-600 mb-3">{c.party}</p>

            {votedCandidateId === c.id ? (
              <p className="text-green-600 font-semibold">✔ You voted here</p>
            ) : (
              <button
                disabled={votedCandidateId !== null}
                onClick={() => handleVoteClick(c)}
                className={`px-4 py-2 rounded text-white 
                  ${votedCandidateId !== null ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
                `}
              >
                Vote
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Your Vote</h3>
            <p className="mb-4">
              Are you sure you want to vote for{" "}
              <span className="font-bold text-blue-700">
                {selectedCandidate?.name}
              </span>
              ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default CandidatesToVote