//used to handle all api calls for /candidate endpoint
export const getAllCandidates = async (setCandidates, token, setisloading) => {
  try {
    setisloading(true);
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
    if (data && data.length > 0) {
      setCandidates(data);
    }
  } catch (error) {
    console.log("Failed to fetch candidates", error);
    alert("Failed to fetch candidates");
  } finally {
    setisloading(false);
  }
};


export const addCandidate = async (dataToSave, token, setreload, setisloading) => {
  try {
    setisloading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSave),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to add candidate");
      return;
    }

    const data = await res.json();
    console.log("candidate added:", data);
    setreload((prev) => !prev);
  } catch (error) {
    console.log("Failed to add candidate", error);
    alert("Failed to add candidate");
  } finally {
    setisloading(false);
  }
};


export const deleteCandidate = async (id, token, setreload, setisloading) => {
  try {
    setisloading(true);
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

    console.log("candidate deleted successfully!");
    setreload((prev) => !prev);
  } catch (error) {
    console.log("Failed delete candidate", error);
    alert("Failed to delete candidate");
  } finally {
    setisloading(false);
  }
};


export const updateCandidate = async (dataToUpdate, id, token, setreload, setisloading) => {
  try {
    setisloading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToUpdate),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to update candidate");
      return;
    }

    const data = await res.json();
    console.log("candidate updated:", data);
    setreload((prev) => !prev);
  } catch (error) {
    console.log("Failed to update candidate", error);
    alert("Failed to update candidate");
  } finally {
    setisloading(false);
  }
};


export const voteCandidate = async (id, token, setreload, setisloading) => {
  try {
    setisloading(true);
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
      alert(err.message || "Failed to vote candidate");
      return;
    }

    const data = await res.json();
    console.log("voted:", data);
    alert(data?.message);
    setreload((prev) => !prev);
  } catch (error) {
    console.log("Failed to vote the candidate", error);
    alert("Failed to vote the candidate");
  } finally {
    setisloading(false);
  }
};


//getting votecount
export const getVoteCount = async (setvotCount, token, setisloading) => {
  try {
    setisloading(true);
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
    setvotCount(data);
  } catch (error) {
    console.log("Failed to fetch vote count", error);
    alert("Failed to fetch vote count");
  } finally {
    setisloading(false);
  }
};
