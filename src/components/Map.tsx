import { GoogleMap, Marker } from "@react-google-maps/api";
import useGetEstablishmentsByCity from "../hooks/useGetEstablishmentsByCity";
import useGetUserLocation from "../hooks/useGetUserLocation";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get("city") || "Malmö");
  const { data: establishments, loading } = useGetEstablishmentsByCity(city);
  const { userLocation, isLoading } = useGetUserLocation();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] =
    useState<PositionCoords | null>(null);
  const [info, setInfo] = useState<Establishment | null>(null);
  const [centerPosition, setCenterPosition] =
    useState<PositionCoords>(defaultCenter);

  const myPositionIcon =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

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

    // Update the city and URL params
    setCity(selectedCity);
    setSearchParams({ city: selectedCity });
  };

  useEffect(() => {
    if (userLocation) {
      setCenterPosition({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    // Update city from URL if it changes
    const newCity = searchParams.get("city") || "Malmö";
    if (city !== newCity) {
      setCity(newCity);
      const newCenter = locations[newCity as keyof typeof locations];

      setCenterPosition(newCenter);
    }
  }, [searchParams]);

  if (loading || !centerPosition) {
    console.log("Loading data and location...");
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div>
        <select
          onChange={handleLocationChange}
          style={{ padding: "8px", fontSize: "16px" }}
          value={city} // Ensure the select value is synchronized with state
        >
          <option value="Min_position">Min position</option>
          <option value="Lund">Lund</option>
          <option value="Malmö">Malmö</option>
          <option value="Eslöv">Eslöv</option>
        </select>
      </div>
      <div className="map-wrapper">
        {!loading && !isLoading && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={centerPosition ? centerPosition : defaultCenter}
            zoom={14}
          >
            <>
              {showInfoWindow && infoWindowPosition && info && (
                <MarkerInfoWindow
                  handleClose={handleClose}
                  position={infoWindowPosition}
                  info={info}
                />
              )}

              {userLocation && (
                <Marker
                  position={{
                    lat: userLocation.coords.latitude,
                    lng: userLocation.coords.longitude,
                  }}
                  icon={myPositionIcon}
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
        )}
      </div>
      <div>
        <ul>
          {establishments &&
            establishments.map((establishment) => (
              <li key={establishment._id}>{establishment.name}</li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Map;
