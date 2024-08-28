import { GoogleMap, Marker } from "@react-google-maps/api";
import useGetEstablishments from "../hooks/useGetEstablishments";
import useGetUserLocation from "../hooks/useGetUserLocation";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 55.6049635786228,
    lng: 13.001277692558267,
}

const Map = () => {
    const { data: establishments, loading } = useGetEstablishments();
    const { userLocation, isLoading } = useGetUserLocation();

    console.log(userLocation)

    const center = userLocation
        ? { lat: userLocation.coords.latitude, lng: userLocation.coords.longitude }
        : defaultCenter;

    if (isLoading) return <div>Loading your location...</div>;

    return (
        <div className="map-wrapper">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                {/* Child components, such as markers, info windows, etc. */}
                <>
                    {loading && console.log("loading...")}

                    {userLocation &&
                        // Marker for user position - style differently
                        <Marker
                            // key={userLocation.timestamp}
                            position={{ lat: userLocation.coords.latitude, lng: userLocation.coords.longitude }}
                        />
                    }

                    {establishments &&
                        establishments.map((marker) => {
                            console.log("Marker position:", {
                                lat: marker.geopoint.latitude,
                                lng: marker.geopoint.longitude,
                            });
                            return (
                                <Marker
                                    key={marker._id}
                                    position={{
                                        lat: marker.geopoint.latitude,
                                        lng: marker.geopoint.longitude,
                                    }}
                                />
                            );
                        })}
                </>
            </GoogleMap>
        </div>
    );
};

export default Map;
