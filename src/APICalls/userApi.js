//all calls made to /user endpoint
export const getProfile = async (token,setprofile) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
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
      alert(err.error || "Failed to user profile");
      return;
    }
    const data = await res.json();
   // console.log("user profile:", data);
   setprofile(data && data?.userProfile)
    
  } catch (error) {
    console.log("Failed to user profile", error);
    alert("Failed to user profile");
  }
};