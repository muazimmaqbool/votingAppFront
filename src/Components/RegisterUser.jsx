import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {
  const navigate=useNavigate()
    const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    aadharCardNumber: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [isloadting, setisloadting] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();
// console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);
    //console.log("Voter Registered:", formData);
    try{
      setisloadting(true)
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/signup`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(formData)
      })
      if(!res.ok){
        setisloadting(false)
        const errorData=await res.json()
        console.log("errorData:",errorData)
        alert(errorData?.error || "Registration failed")
        return
      }
      setisloadting(false)
      const data=await res.json()
      console.log("Voter Registered:", data)

      alert("Registration successful!")
      navigate("/")
    }catch(e){
      setisloadting(false)
      console.log("Error while saving new user:",e)
      alert("Failed to save new user")
    }
  };
  return (
    <div className='flex justify-center items-center min-h-screen'>
       <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-10 py-6 w-full overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold text-center mb-3 pb-2 border-b-2 border-gray-200">Voter Registration</h2>

        <label className="block mb-1 font-medium">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-3 focus:ring focus:ring-blue-300"
          required
          placeholder="Enter your full name"
        />


        <label className="block mb-1 font-medium">Age *</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-3 focus:ring focus:ring-blue-300"
          required
          placeholder="Enter your age"
        />


        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-3 focus:ring focus:ring-blue-300"
          placeholder="Enter your email"
        />

        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-3 focus:ring focus:ring-blue-300"
          placeholder="Enter your phone number"
        />


        <label className="block mb-1 font-medium">Address *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-3 focus:ring focus:ring-blue-300"
          required
          placeholder="Enter your address"
        />

        <label className="block mb-1 font-medium">Aadhar Card Number *</label>
        <input
          type="number"
          name="aadharCardNumber"
          value={formData.aadharCardNumber}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-3 focus:ring focus:ring-blue-300"
          required
          placeholder="Enter Aadhar Card Number"
        />


        <label className="block mb-1 font-medium">Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-1 border rounded mb-4 focus:ring focus:ring-blue-300"
          required
          placeholder="Create a password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 transition"
        >
          {isloadting ? "Registering..." : "Register"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-3 bg-gray-200 text-gray-900 py-2 cursor-pointer rounded hover:bg-gray-300 transition"
        >
          Back to Login
        </button>
      </form>
    </div>
  )
}

export default RegisterUser