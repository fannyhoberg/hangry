import { OverlayView } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import ListCard from "./ListCard";

interface MarkerInfoWindowProps {
  handleClose: () => void;
  centerPosition: PositionCoords;
  info: Establishment;
  map: google.maps.Map | null;
  position: PositionCoords;
}

const MarkerInfoWindow: React.FC<MarkerInfoWindowProps> = ({
  handleClose,
  centerPosition,
  info,
  map,
  position,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    window.addEventListener("resize", updateMobileStatus);
    updateMobileStatus();
    return () => window.removeEventListener("resize", updateMobileStatus);
  }, []);

  useEffect(() => {
    if (!isMobile && map) {
      map.panTo(position);
    }
  }, [isMobile, position, map]);

  return (
    <>
      {isMobile ? (
        <div className="info-window-mobile">
          <ListCard centerPosition={centerPosition} establishment={info} handleClose={handleClose} />
        </div>
      ) : (
        <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
          <div className="info-window-desktop">
            <ListCard centerPosition={centerPosition} establishment={info} handleClose={handleClose} />
          </div>
        </OverlayView>

      )}
    </>
  );
};

export default MarkerInfoWindow;
