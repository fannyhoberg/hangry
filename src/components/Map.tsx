import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useGetEstablishments from "../hooks/useGetEstablishments";
import useGetUserLocation from "../hooks/useGetUserLocation";
import { useState } from "react";
import { Establishment, PositionCoords } from "../types/Establishment.types";
import MarkerInfoWindow from "./map/MarkerInfoWindow";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter: PositionCoords = {
  lat: 55.6049635786228,
  lng: 13.001277692558267,
};

const Map = () => {
  const { data: establishments, loading } = useGetEstablishments();
  const { userLocation, isLoading } = useGetUserLocation();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] =
    useState<PositionCoords | null>(null);
  const [info, setInfo] = useState<Establishment | null>(null);
  const [centerPosition, setCenterPosition] = useState<PositionCoords>(
    userLocation
      ? {
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude,
        }
      : defaultCenter
  );

  const locations = {
    Min_position: userLocation
      ? {
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude,
        }
      : defaultCenter,
    Lund: { lat: 55.7046601, lng: 13.1910073 },
    Malmö: { lat: 55.6052931, lng: 13.0001566 },
    Eslöv: { lat: 55.83900838618268, lng: 13.30492141526424 },
  };

  const center = userLocation
    ? { lat: userLocation.coords.latitude, lng: userLocation.coords.longitude }
    : defaultCenter;

  const handleClose = () => {
    setShowInfoWindow(false);
    setInfoWindowPosition(null);
  };

  const handleMarkerClick = (
    position: PositionCoords,
    establishment: Establishment
  ) => {
    setInfo(establishment);
    setShowInfoWindow(true);
    setInfoWindowPosition(position);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCity = event.target.value;
    const newCenter = locations[selectedCity as keyof typeof locations];
    setCenterPosition(newCenter);
  };

  if (isLoading) return <div>Loading your location...</div>;

  return (
    <div className="map-wrapper">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {/* Dropdown to select a city */}

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerPosition ? centerPosition : center}
          zoom={14}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1,
            }}
          >
            <select
              onChange={handleLocationChange}
              style={{ padding: "8px", fontSize: "16px" }}
            >
              <option value="Min_position">Min position</option>
              <option value="Lund">Lund</option>
              <option value="Malmö">Malmö</option>
              <option value="Eslöv">Eslöv</option>
            </select>
          </div>

          <>
            {loading && console.log("loading...")}

            {showInfoWindow && infoWindowPosition && info && (
              <MarkerInfoWindow
                handleClose={handleClose}
                position={infoWindowPosition}
                info={info}
              />
            )}

            {userLocation && (
              // Marker for user position - style differently
              <Marker
                // key={userLocation.timestamp}
                position={{
                  lat: userLocation.coords.latitude,
                  lng: userLocation.coords.longitude,
                }}
              />
            )}

            {establishments &&
              establishments.map((establishment) => {
                const position: PositionCoords = {
                  lat: establishment.geopoint.latitude,
                  lng: establishment.geopoint.longitude,
                };

                return (
                  <Marker
                    onClick={() => handleMarkerClick(position, establishment)}
                    key={establishment._id}
                    position={position}
                  />
                );
              })}
          </>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
