import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { getVoteCount } from '../../APICalls/candidates';

const VoteCount = () => {
    const{jwtToken}=useAuth()
    const [voteCount, setvoteCount] = useState([]);
    useEffect(() => {
        if(jwtToken){
            getVoteCount(setvoteCount, jwtToken);
        }
    }, [jwtToken]);
    // console.log("voteCount:",voteCount);
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-2xl font-bold text-center mb-6">
        Election Vote Count
      </h1>

      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Party Name</th>
              <th className="p-3 text-center">Votes</th>
            </tr>
          </thead>

          <tbody>
            {voteCount && voteCount.length>0 && voteCount?.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3 font-medium">{item.party}</td>
                <td className="p-3 text-center font-bold">
                  {item.count}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {voteCount.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No votes yet
          </div>
        )}

      </div>
    </div>

  )
}

export default VoteCount