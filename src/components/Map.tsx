import { GoogleMap, Marker } from "@react-google-maps/api";
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
}

const Map = () => {
    const { data: establishments, loading } = useGetEstablishments();
    const { userLocation, isLoading } = useGetUserLocation();
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [infoWindowPosition, setInfoWindowPosition] = useState<PositionCoords | null>(null);
    const [info, setInfo] = useState<Establishment | null>(null);

    const center = userLocation
        ? { lat: userLocation.coords.latitude, lng: userLocation.coords.longitude }
        : defaultCenter;

    const handleClose = () => {
        setShowInfoWindow(false);
        setInfoWindowPosition(null);
    }

    const handleMarkerClick = (position: PositionCoords, establishment: Establishment) => {
        setInfo(establishment)
        setShowInfoWindow(true);
        setInfoWindowPosition(position);
    }

    if (isLoading) return <div>Loading your location...</div>;

    return (
        <div className="map-wrapper">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                {/* Child components, such as markers, info windows, etc. */}
                <>
                    {loading && console.log("loading...")}

                    {showInfoWindow && infoWindowPosition && info &&
                        <MarkerInfoWindow handleClose={handleClose} position={infoWindowPosition} info={info} />
                    }

                    {userLocation &&
                        // Marker for user position - style differently
                        <Marker
                            // key={userLocation.timestamp}
                            position={{ lat: userLocation.coords.latitude, lng: userLocation.coords.longitude }}
                        />
                    }

                    {establishments &&
                        establishments.map((establishment) => {
                            const position: PositionCoords = {
                                lat: establishment.geopoint.latitude,
                                lng: establishment.geopoint.longitude,
                            }

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
        </div>
    );
};

export default Map;
