//used to handle all api calls for /candidate endpoint
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

export const addCandidate = async (dataToSave, token,setreload) => {
    // console.log("dataToSave:",dataToSave)
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
    setreload((prev)=>!prev)
    
  } catch (error) {
    console.log("Failed toadd candidate", error);
    alert("Failed to add candidate");
  }
};

export const deleteCandidate=async(id,token,setreload)=>{
    // console.log("id to delete:",id)
     try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to delete candidate");
      return;
    }
    console.log("candidate delete successfully!")
    setreload((prev)=>!prev)
    
  } catch (error) {
    console.log("Failed delete candidate", error);
    alert("Failed to delete candidate");
  }
}

export const updateCandidate = async (dataToUpdate,id, token,setreload) => {
    // console.log("id to update:",id)
    // console.log("dataToUpdate:",dataToUpdate)
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
         body:JSON.stringify(dataToUpdate)
      }
    );
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to update candidate");
      return;
    }
    const data = await res.json();
    console.log("candidate updated:", data);
    setreload((prev)=>!prev)
    
  } catch (error) {
    console.log("Failed toupdate candidate", error);
    alert("Failed to update candidate");
  }
};

export const voteCandidate = async (id, token,setreload) => {
   console.log("voting to:",id)
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/vote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const err = await res.json();
      setreload((prev)=>!prev)
      alert(err.message || "Failed to vote the candidate");
      return;
    }
    const data = await res.json();
    console.log("voted:",data);
    alert(data?.message)
    setreload((prev)=>!prev)
    
  } catch (error) {
    console.log("Failed to vote the candidate", error);
    alert("Failed to vote the candidate");
  }
};

//getting votecount
export const getVoteCount = async (setvotCount, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/vote/count`,
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
      alert(err.error || "Failed to fetch vote count");
      return;
    }
    const data = await res.json();
   // console.log("vote count:", data);
    setvotCount(data)
  } catch (error) {
    console.log("Failed to fetch vote count", error);
    alert("Failed to fetch vote count");
  }
};