//all calls made to /user endpoint
export const getProfile = async (token, setprofile, setisloading) => {
  try {
    setisloading(true);
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
    setprofile(data && data?.userProfile);
  } catch (error) {
    console.log("Failed to user profile", error);
    alert("Failed to user profile");
  } finally {
    setisloading(false);
  }
};


export const updateProfile = async (dataToUpdate, id, token, setreload, setisloading) => {
  try {
    setisloading(true);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToUpdate),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to update user");
      return;
    }

    const data = await res.json();
    console.log("user updated:", data);
    setreload((prev) => !prev);
  } catch (error) {
    console.log("Failed to update user", error);
    alert("Failed to update user");
  } finally {
    setisloading(false);
  }
};


export const getAllVoters = async (setVoters, token, setisloading) => {
  try {
    setisloading(true);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to fetch voters");
      return;
    }

    const data = await res.json();
    if (data && data.length > 0) {
      setVoters(data);
    }
  } catch (error) {
    console.log("Failed to fetch voters", error);
    alert("Failed to fetch voters");
  } finally {
    setisloading(false);
  }
};


export const updatePassword = async (
  currentPassword,
  newPassword,
  token,
  handleLogout,
  setisloading
) => {
  try {
    setisloading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/profile/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to update password");
      return;
    }

    const data = await res.json();
    console.log("password updated:", data);
    alert("Password changed successfully!");
    handleLogout();
  } catch (error) {
    console.log("Failed to update password", error);
    alert("Failed to update password");
  } finally {
    setisloading(false);
  }
};
