import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "./App.css";

function App() {
  return (
    <>
      <MapContainer
        center={[28.892549, 76.5954186]}
        zoom={13}
        scrollWheelZoom={false}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.892549, 76.5954186]}>
          <Popup>Your Current location.</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
