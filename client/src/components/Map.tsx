import "leaflet/dist/leaflet.css";
import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { pointlist, mapPoint, CenterStack, CenterObj } from "./CenterInterface";
import { divIcon } from "leaflet";

interface props {
  points: CenterObj[];
  spawn: number[];
  showAdress: boolean;
}

export function Map(props: props) {
  return (
    <div className="MapWrapper">
      <MapContainer
        center={[
          props.spawn[0] ? props.spawn[0] : 55.3781,
          props.spawn[1] ? props.spawn[1] : -3.436,
        ]}
        zoom={props.spawn[2] ? props.spawn[2] : 5}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
        {props.points.map(
          (point: CenterObj, index: number = point.center_id) => (
            <Marker key={index} position={[point.lattitude, point.longitude]}>
              <Popup>
                {!props.showAdress ? (
                  point.name
                ) : (
                  <div>
                    {point.adress.adress_line_1}, {point.adress.city},{" "}
                    {point.adress.postal_code}, {point.adress.region}
                  </div>
                )}
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
}
