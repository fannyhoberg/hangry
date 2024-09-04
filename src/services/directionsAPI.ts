import { PositionCoords } from "../types/Establishment.types";

export const generateDirectionsURL = (
  origin: PositionCoords,
  destinationCoords: PositionCoords,
  destination_place_id?: string
) => {
  console.log("Origin", origin);
  if (destination_place_id) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination_place_id=${destination_place_id}&destination=there`;
  } else {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}`;
  }
};

// https://www.google.com/maps/dir/?api=1&origin=COORDS&destination=COORDS
