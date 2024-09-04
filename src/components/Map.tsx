import { GoogleMap, Marker } from "@react-google-maps/api";
import useGetEstablishmentsByCity from "../hooks/useGetEstablishmentsByCity";
import useGetUserLocation from "../hooks/useGetUserLocation";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Establishment, PositionCoords } from "../types/Establishment.types";
import MarkerInfoWindow from "./map/MarkerInfoWindow";
import CardList from "./map/CardList";
import { Button } from "react-bootstrap";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter: PositionCoords = {
  lat: 55.6049635786228,
  lng: 13.001277692558267,
};

const createIcon = (text: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <circle cx="20" cy="20" r="18" fill="#5EA38A" stroke="#004F32" stroke-width="3" />
      <text x="20" y="27" font-size="24" text-anchor="middle" fill="#004F32" font-family="Arial" font-weight="bold">${text}</text>
    </svg>
  `)}`;

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "Malmö";
  const [city, setCity] = useState(initialCity);
  const { data: establishments, loading } = useGetEstablishmentsByCity(city);
  const { userLocation } = useGetUserLocation();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState<PositionCoords | null>(null);
  const [info, setInfo] = useState<Establishment | null>(null);
  const [centerPosition, setCenterPosition] = useState<PositionCoords>(defaultCenter);
  const [showList, setShowList] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const coffeeIcon = useMemo(() => createIcon("☕"), []);
  const restaurantIcon = useMemo(() => createIcon("🍕"), []);
  const barIcon = useMemo(() => createIcon("🍺"), []);

  const locations = useMemo(
    () => ({
      MyPosition: userLocation
        ? {
            lat: userLocation.geolocation.coords.latitude,
            lng: userLocation.geolocation.coords.longitude,
          }
        : defaultCenter,
      Lund: { lat: 55.7046601, lng: 13.1910073 },
      Malmö: { lat: 55.6052931, lng: 13.0001566 },
      Eslöv: { lat: 55.83900838618268, lng: 13.30492141526424 },
    }),
    [userLocation]
  );

  const handleMarkerClick = useCallback(
    (position: PositionCoords, establishment: Establishment) => {
      setInfo(establishment);
      setShowInfoWindow(true);
      setInfoWindowPosition(position);
    },
    []
  );

  const handleClose = useCallback(() => {
    setShowInfoWindow(false);
    setInfoWindowPosition(null);
  }, []);

  const handleLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      const newCenter = locations[value as keyof typeof locations];
      setCenterPosition(newCenter);
      const newCity =
        value === "MyPosition" ? (userLocation ? userLocation.cityName : "Malmö") : value;
      setCity(newCity);
      setSearchParams({ city: newCity });
    },
    [locations, userLocation, setSearchParams]
  );

  useEffect(() => {
    if (userLocation) {
      setCity(userLocation.cityName);
      setCenterPosition({
        lat: userLocation.geolocation.coords.latitude,
        lng: userLocation.geolocation.coords.longitude,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    const newCity = searchParams.get("city") || "Malmö";
    if (city !== newCity) {
      setCity(newCity);
      setCenterPosition(locations[newCity as keyof typeof locations]);
    }
  }, [searchParams, city, locations]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance); // Save map instance in state
  }, []);

  if (loading || !centerPosition) {
    console.log("Loading data and location...");
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div className="map-top">
        <select onChange={handleLocationChange} className="city-select">
          <option value="MyPosition">My position</option>
          <option value="Lund">Lund</option>
          <option value="Malmö">Malmö</option>
          <option value="Eslöv">Eslöv</option>
        </select>
        {establishments && establishments.length > 0 && (
          <Button onClick={() => setShowList(!showList)}>
            {showList ? "Stäng lista" : "Visa lista"}
          </Button>
        )}
      </div>
      <div className="map-wrapper">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerPosition}
          zoom={14}
          onLoad={onLoad}
        >
          <>
            {showInfoWindow && infoWindowPosition && info && (
              <MarkerInfoWindow
                handleClose={handleClose}
                centerPosition={centerPosition}
                info={info}
                map={map}
                position={infoWindowPosition}
              />
            )}

            {userLocation && (
              <Marker
                position={{
                  lat: userLocation.geolocation.coords.latitude,
                  lng: userLocation.geolocation.coords.longitude,
                }}
                zIndex={2000}
                icon={"https://fav.farm/👹"}
              />
            )}

            {establishments &&
              centerPosition &&
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
                    icon={
                      establishment.category.includes("bar")
                        ? barIcon
                        : establishment.category.includes("restaurant")
                        ? restaurantIcon
                        : coffeeIcon
                    }
                  />
                );
              })}
          </>
        </GoogleMap>
      </div>

      {establishments && showList && (
        <CardList
          handleButtonClick={() => setShowList(!showList)}
          centerPosition={centerPosition}
          establishments={establishments}
          city={city}
        />
      )}
    </>
  );
};

export default Map;
