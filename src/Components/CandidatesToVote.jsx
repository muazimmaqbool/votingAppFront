import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { getAllCandidates, voteCandidate } from '../APICalls/candidates';
import { getProfile } from '../APICalls/userApi';

const CandidatesToVote = () => {
const { jwtToken } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [profile, setprofile] = useState();
  const [selectedCandidate, setSelectedCandidate] = useState(null); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [votedCandidateId, setVotedCandidateId] = useState(null);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    if (jwtToken) {
      setShowConfirm(false);
      getProfile(jwtToken, setprofile);
      getAllCandidates(setCandidates, jwtToken);
    }
  }, [jwtToken, reload]);
// console.log("candidates:",candidates);
// console.log("profile:",profile);
 

  const handleVoteClick = (candidate) => {
    if (votedCandidateId) return;
    setSelectedCandidate(candidate);
    setShowConfirm(true);
  };
// console.log("selectedCandidate:",selectedCandidate);
  const confirmVote = () => {
   voteCandidate(selectedCandidate?._id,jwtToken,setreload)
  };
  // console.log("votedCandidateId:",votedCandidateId);

  return (
    <div className='overflow-y-auto h-[80vh]'>

      <div className="bg-yellow-200 text-yellow-800 border border-yellow-500 p-3 rounded mb-4">
        {profile?.isVoted ? "✔️ You have already voted, you can't undo or vote again":"⚠ Once you vote, you cannot undo or change your vote."}
      </div>
      <h2 className="text-2xl font-bold mb-4">Candidates</h2>

    {/*
    -> md:grid-cols-2 : On medium screens → 2 columns
    -> lg:grid-cols-3 : On large screens → 3 columns
    -> Responsively displays 1, 2, or 3 candidates per row i.e one column on smaller
    */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((c,index)=> (
          <div
            key={index}
            className="bg-white p-4 shadow rounded border"
          >
            <p className="font-semibold text-lg">{c.name}</p>
            <p className="text-gray-600 mb-3">{c.party}</p>

            {votedCandidateId === c._id ? (
              <p className="text-green-600 font-semibold">✔ You voted here</p>
            ) : (
              <button
                disabled={profile?.isVoted}
                onClick={() => handleVoteClick(c)}
                className={`px-4 py-2 rounded text-white 
                  ${profile?.isVoted ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
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