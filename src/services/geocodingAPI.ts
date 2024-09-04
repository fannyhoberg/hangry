import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface GeopointRes {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: string;
}

interface ReverseGeocodingRes {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
  }[];
  status: string;
}

// want address component where type is postal_town

export const getGeopoint = async (address: string) => {
  const res = await axios.get<GeopointRes>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );
  return res.data.results[0].geometry.location;
};

export const getCityFromCoords = async (lat: number, lng: number) => {
  const res = await axios.get<ReverseGeocodingRes>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  );

  const address_components = res.data.results[0].address_components;

  const postal_townObj = address_components.find((component) =>
    component.types.includes("postal_town")
  );

  if (postal_townObj) {
    return postal_townObj.long_name;
  }
};
