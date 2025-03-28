import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();


  const handleBookAmbulanceClick = () => {
    navigate("/book-ambulance");
  };
  const handleRegisterAmbulance = () => {
    navigate("/register-ambulance")
  }

  return (

    <div className="min-h-[92vh]  w-full bg-white rounded-3xl relative">

      <div className="h-full w-full absolute">
        <img src="/Ambulance.webp" className="h-full w-full object-cover rounded-3xl" />
      </div>
      <div className="h-full w-full absolute bg-[rgba(0,0,0,0.5)] rounded-3xl flex items-center justify-center flex-col">
        <h1 className="font-[header] text-[7vw] text-white">We Help You Book Ambulance</h1>
        <div className="w-full font-[header] text-[3vw] flex items-center justify-evenly">
          <button className="bg-white py-4 px-6 rounded-3xl" onClick={handleBookAmbulanceClick}>Book Ambulance</button>
          <button className="bg-white py-4 px-6 rounded-3xl" onClick={handleRegisterAmbulance}>Register the Ambulance</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage