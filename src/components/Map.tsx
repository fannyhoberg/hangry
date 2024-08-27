import { GoogleMap, LoadScript } from "@react-google-maps/api";

const google_api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Geocoding request:
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.6049635786228,
  lng: 13.001277692558267,
};

const Map = () => {
  return (
    <div className="map-wrapper">
      <LoadScript googleMapsApiKey={google_api_key}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
