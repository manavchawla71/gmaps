import { useState, useEffect } from "react";
import { PiMapPinLight } from "react-icons/pi";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { renderToString } from "react-dom/server";

const iconHtml = renderToString(<PiMapPinLight size={32} color="red" />);
const customIcon = new L.DivIcon({
  html: `<div style="font-size:32px; color:red;">${iconHtml}</div>`,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
function MapClickHandler({ setMarkerData }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
        .then((response) => {
          var placename = response.data.display_name;
          setMarkerData({
            lat,
            lng,
            placename,
          });
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
        center={[28.892549, 76.5954186]}
        zoom={5}
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
          <Marker position={[markerData.lat, markerData.lng]} icon={customIcon}>
            <Popup>
              {markerData.placename}
              <br />
              {`(${markerData.lat.toFixed(4)}, ${markerData.lng.toFixed(4)})`}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}

export default App;
