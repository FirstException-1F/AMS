import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import BookAmbulance from "./component/BookAmbulance";
import RegisterAmbulance from "./component/RegisterAmbulance";
import Map from "./component/Map";

function App() {

  return (
    <Router>
      <div className="min-h-screen w-full p-5">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book-ambulance" element={<BookAmbulance />} />
          <Route path="/register-ambulance" element={<RegisterAmbulance/>} />
          <Route path="/Map" element={<Map/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
