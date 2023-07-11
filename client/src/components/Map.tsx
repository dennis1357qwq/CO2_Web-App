import "leaflet/dist/leaflet.css";
import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { pointlist, mapPoint, CenterStack, CenterObj } from "./CenterInterface";

export function Map(points: CenterStack) {
  return (
    <div className="MapWrapper">
      <MapContainer center={[55.3781, -3.436]} zoom={4}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
        {points.centers.map(
          (point: CenterObj, index: number = point.center_id) => (
            <Marker key={index} position={[point.lattitude, point.longitude]}>
              <Popup>{point.name}</Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
}
