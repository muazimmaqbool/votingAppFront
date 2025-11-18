import React, { useState } from 'react'

const CandidatesToVote = () => {
const candidates = [
  { id: 1, name: "Aadil Sheikh", party: "People's Reform Party" },
  { id: 2, name: "Sana Mir", party: "National Unity Front" },
  { id: 3, name: "Umar Rafiq", party: "Progressive Youth Alliance" },
  { id: 4, name: "Mehreen Fatima", party: "Democratic Vision Party" },
  { id: 5, name: "Rayyan Bashir", party: "Green Valley Movement" },
  { id: 6, name: "Hamza Lone", party: "Justice & Welfare League" },
  { id: 7, name: "Iqra Shafi", party: "Peace & Development Council" },
  { id: 8, name: "Zaid Ahmad", party: "Future Leaders Party" },
];


  const [selectedCandidate, setSelectedCandidate] = useState(null); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [votedCandidateId, setVotedCandidateId] = useState(null); 

  const handleVoteClick = (candidate) => {
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

      <div className="bg-yellow-200 text-yellow-800 border border-yellow-500 p-3 rounded mb-4">
        ⚠ Once you vote, you cannot undo or change your vote.
      </div>

      <h2 className="text-2xl font-bold mb-4">Candidates</h2>

    {/*
    -> md:grid-cols-2 : On medium screens → 2 columns
    -> lg:grid-cols-3 : On large screens → 3 columns
    -> Responsively displays 1, 2, or 3 candidates per row i.e one column on smaller
    */}
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

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-20">
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