import { InfoWindow } from "@react-google-maps/api";
import Image from "react-bootstrap/Image";
import React from "react";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import { generateDirectionsURL } from "../../services/directionsAPI";

interface MarkerInfoWindowProps {
  handleClose: () => void;
  position: PositionCoords;
  centerPosition: PositionCoords;
  info: Establishment;
  //   url: string;
}

const MarkerInfoWindow: React.FC<MarkerInfoWindowProps> = ({
  handleClose,
  position,
  centerPosition,
  info,
}) => {
  const url = generateDirectionsURL(centerPosition, position);

  return (
    <InfoWindow onCloseClick={handleClose} position={position}>
      <div>
        {info.photoUrls && <Image src={info.photoUrls[0]} rounded className="mb-3" />}
        <h6>{info.name}</h6>
        <span>{info.address}</span>
        <hr className="mt-2 mb-2" />
        <p className="mb-1">{info.category.join(", ").toUpperCase()}</p>
        <hr className="mt-2 mb-2" />

        <a href={url} className="btn btn-primary" target="_blank">
          Vägbeskrivning
        </a>
      </div>
    </InfoWindow>
  );
};

export default MarkerInfoWindow;
