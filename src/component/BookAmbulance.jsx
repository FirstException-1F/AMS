import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [40, 40],
});

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
  iconSize: [30, 30],
});

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (angle * Math.PI) / 180;
  const R = 6371; // Earth's radius in KM
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const BookAmbulance = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ambulances"));
        const ambulancesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setLocations(ambulancesData);
        console.log("Fetched ambulances:", ambulancesData);
      } catch (error) {
        console.error("Error fetching ambulances:", error);
      }
    };

    fetchAmbulances();
  }, []);

  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Recalculate nearby locations when userLocation or locations changes
  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const filteredLocations = locations
        .map((location) => {
          const distance = getDistance(
            userLocation.lat,
            userLocation.lng,
            location.location.lat,
            location.location.lng
          );
          return { ...location, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .filter((location) => (location.distance <= 10 && location.distance > 0));

      setNearbyLocations(filteredLocations);
    }
  }, [userLocation, locations]);

  console.log(userLocation, nearbyLocations);

  return (
    <div>

      {userLocation && (
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User Location Marker */}
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here!</Popup>
          </Marker>

          {/* Nearby Locations Markers */}
          {nearbyLocations.map((location, index) => (
            <Marker
              key={index}
              position={[location.location.lat, location.location.lng]}
              icon={locationIcon}
            >
              <Popup>
                <b>{location.name}</b> <br />
                Distance: {location.distance.toFixed(2)} km
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      <div className="w-full flex items-center justify-center flex-col">
        <h2 className="font-[Header] text-[4vw]">Nearby Locations (within 10km)</h2>
        {nearbyLocations.length > 0 ? (
          <ul>
            {nearbyLocations.map((location, index) => (
              <li key={index} className="font-semibold text-xl">
                {location.name} - {location.distance.toFixed(2)} km away
              </li>
            ))}
          </ul>
        ) : (
          <p>No locations nearby</p>
        )}
      </div>

    </div>
  );
};

export default BookAmbulance;
