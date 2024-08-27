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

export const getGeopoint = async (address: string) => {
  const res = await axios.get<GeopointRes>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );
  return res.data.results[0].geometry.location;
};
