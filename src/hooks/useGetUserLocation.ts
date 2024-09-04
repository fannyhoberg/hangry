import { useCallback, useEffect, useState } from "react";
import { getCityFromCoords } from "../services/geocodingAPI";
import { UserLocation } from "../types/User.types";

const useGetUserLocation = () => {
  const [userLocationCoords, setUserLocationCoords] =
    useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const reverseGeocoding = useCallback(async () => {
    if (!userLocationCoords) return;

    setIsLoading(true);

    if (userLocationCoords) {
      try {
        const city = await getCityFromCoords(
          userLocationCoords.coords.latitude,
          userLocationCoords.coords.longitude
        );
        if (city) {
          setUserLocation({ geolocation: userLocationCoords, cityName: city });
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error getting city from coords");
        }
      }
    }
    setIsLoading(false);
  }, [userLocationCoords]);

  useEffect(() => {
    setIsLoading(true);

    const success = (position: GeolocationPosition) => {
      setUserLocationCoords(position);
      setIsLoading(false);
    };

    const error = (err: GeolocationPositionError) => {
      setError(err.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      maximumAge: 10000,
      timeout: 10000,
    });
  }, []);

  useEffect(() => {
    if (userLocationCoords) {
      reverseGeocoding();
    }
  }, [reverseGeocoding, userLocationCoords]);

  return {
    userLocation,
    error,
    isLoading,
  };
};

export default useGetUserLocation;
