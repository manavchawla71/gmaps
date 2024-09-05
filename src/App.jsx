import { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function MapClickHandler({ setMarkerData }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerData({
        lat,
        lng,
        place: `(${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      });
    },
  });
  return null;
}
function App() {
  const [markerData, setMarkerData] = useState(null);

  const [position, setposition] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setposition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <>
      <MapContainer
        // onclick={handle}
        center={[28.892549, 76.5954186]}
        zoom={9}
        scrollWheelZoom={true}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler setMarkerData={setMarkerData} />
        {position && (
          <Marker position={position}>
            <Popup>You are here.</Popup>
          </Marker>
        )}
        {markerData && (
          <Marker position={[markerData.lat, markerData.lng]}>
            <Popup>{markerData.place}</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}

export default App;
