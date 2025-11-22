import { useAuth } from "../Context/AuthContext";

export const getAllCandidates = async (setCandidates, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to fetch candidates");
      return;
    }
    const data = await res.json();
    // console.log("user login:", data);
    if (data && data.length > 0) {
      setCandidates(data);
    }
  } catch (error) {
    console.log("Failed to fetch candidates", error);
    alert("Failed to fetch candidates");
  }
};

export const addCandidate = async (dataToSave, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
         body:JSON.stringify(dataToSave)
      }
    );
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to add candidate");
      return;
    }
    const data = await res.json();
    console.log("candidate added:", data);
    
  } catch (error) {
    console.log("Failed toadd candidate", error);
    alert("Failed to add candidate");
  }
};
