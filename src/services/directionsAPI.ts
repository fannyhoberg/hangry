import { PositionCoords } from "../types/Establishment.types";

export const generateDirectionsURL = (origin: PositionCoords, destination: PositionCoords) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
};

// https://www.google.com/maps/dir/?api=1&origin=COORDS&destination=COORDS