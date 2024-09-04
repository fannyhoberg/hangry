import { GoogleMap, Marker } from "@react-google-maps/api";
import useGetEstablishmentsByCity from "../hooks/useGetEstablishmentsByCity";
import useGetUserLocation from "../hooks/useGetUserLocation";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [showList, setShowList] = useState<boolean>(false);

  const coffeeIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <circle cx="20" cy="20" r="18" fill="#5EA38A" stroke="#004F32" stroke-width="3" />
      <text x="20" y="27" font-size="25" text-anchor="middle" fill="#004F32" font-family="Arial" font-weight="bold">&#x2615;</text>
    </svg>
  `)}`;

  const restaurantIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <circle cx="20" cy="20" r="18" fill="#5EA38A" stroke="#004F32" stroke-width="3" />
      <text x="20" y="27" font-size="24" text-anchor="middle" fill="#004F32" font-family="Arial" font-weight="bold">&#127790;</text>
    </svg>
  `)}`;

  const locations = {
    MyPosition: userLocation
      ? {
          lat: userLocation.geolocation.coords.latitude,
          lng: userLocation.geolocation.coords.longitude,
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
    const value = event.target.value;

    const selectedCity = value;
    const newCenter = locations[selectedCity as keyof typeof locations];
    setCenterPosition(newCenter);
    console.log(selectedCity);

    // Update the city and URL params
    const newCity =
      value === "MyPosition"
        ? userLocation
          ? userLocation.cityName
          : "Malmö"
        : value;
    setCity(newCity);
    setSearchParams({ city: newCity });
  };

  useEffect(() => {
    if (userLocation) {
      setCenterPosition({
        lat: userLocation.geolocation.coords.latitude,
        lng: userLocation.geolocation.coords.longitude,
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
          // value="Choose location" // Ensure the select value is synchronized with state
        >
          <option value="MyPosition">My position</option>
          <option value="Lund">Lund</option>
          <option value="Malmö">Malmö</option>
          <option value="Eslöv">Eslöv</option>
        </select>
        {establishments && establishments.length > 1 && (
          <Button onClick={() => setShowList(!showList)}>Visa lista</Button>
        )}
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
                  centerPosition={centerPosition}
                />
              )}

              {userLocation && (
                <Marker
                  position={{
                    lat: userLocation.geolocation.coords.latitude,
                    lng: userLocation.geolocation.coords.longitude,
                  }}
                  // icon={myPositionIcon}
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
                      icon={
                        establishment.category[0] === "restaurant"
                          ? restaurantIcon
                          : coffeeIcon
                      }
                    />
                  );
                })}
            </>
          </GoogleMap>
        )}
      </div>

      {establishments && showList && (
        <CardList
          handleButtonClick={() => setShowList(!showList)}
          centerPosition={centerPosition}
          establishments={establishments}
        ></CardList>
      )}
    </>
  );
};

export default Map;
