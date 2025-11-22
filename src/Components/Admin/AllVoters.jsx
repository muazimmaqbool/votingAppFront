import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { getAllVoters } from "../../APICalls/userApi";

const AllVoters = () => {
  const { jwtToken } = useAuth();
  const [voters, setVoters] = useState([]);
  useEffect(() => {
    if (jwtToken) {
      getAllVoters(setVoters, jwtToken);
    }
  }, [jwtToken]);
  // console.log("voters:",voters)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">All Voters</h2>

      {/* for large screens*/}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Aadhar Card</th>
              <th className="p-2 border">Voted?</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((v) => (
              <tr key={v.id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{v.name}</td>
                <td className="p-2 border">{v.address}</td>
                <td className="p-2 border">{v.aadharCardNumber}</td>
                <td className="p-2 border">
                  {v.isVoted ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* for small screens */}
      <div className="md:hidden space-y-4">
        {voters.map((v) => (
          <div
            key={v.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p>
              <span className="font-semibold">Name:</span> {v.name}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {v.address}
            </p>
            <p>
              <span className="font-semibold">Aadhar:</span> {v.aadhar}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Voted:</span>{" "}
              {v.hasVoted ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                <span className="text-red-600 font-semibold">No</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVoters;
