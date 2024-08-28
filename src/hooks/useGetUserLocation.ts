import { useEffect, useState } from "react";

const useGetUserLocation = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(navigator.geolocation);
    setIsLoading(true);

    const success = (position: GeolocationPosition) => {
      // If success, update state to hold geolocation of user:
      setUserLocation(position);
      setIsLoading(false);
    };

    const error = (err: GeolocationPositionError) => {
      setError(err.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      maximumAge: 10000, // Do not refetch information if current info is less than 10 sec fresh
      timeout: 10000, // Stop request if it doesn't work after 10 sec
    });
  }, []);

  return {
    userLocation,
    error,
    isLoading,
  };
};

export default useGetUserLocation;
