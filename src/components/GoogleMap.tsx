import { GoogleMap, LoadScript } from "@react-google-maps/api";

const google_api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={google_api_key}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
