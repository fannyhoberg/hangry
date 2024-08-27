import { GoogleMap, Marker } from "@react-google-maps/api";
import useGetEstablishments from "../hooks/useGetEstablishments";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.6049635786228,
  lng: 13.001277692558267,
};

const Map = () => {
  const { data: establishments, loading } = useGetEstablishments();

  return (
    <div className="map-wrapper">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {loading && console.log("loading...")}

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
