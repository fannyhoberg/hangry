import { where } from "firebase/firestore";
import { establishmentCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";
import { useMemo } from "react";

const useGetEstablishmentsByCity = (currentCity: string | undefined) => {
  const queryConstraints = useMemo(
    () => [where("city", "==", currentCity)],
    [currentCity]
  );
  return useStreamCollection(establishmentCol, ...queryConstraints);
};

export default useGetEstablishmentsByCity;
