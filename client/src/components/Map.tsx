import "leaflet/dist/leaflet.css";
import "./Map.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

export function Map() {
  return (
    <div className="MapWrapper">
      <MapContainer center={[52.520008, 13.404954]} zoom={13}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
      </MapContainer>
    </div>
  );
}
