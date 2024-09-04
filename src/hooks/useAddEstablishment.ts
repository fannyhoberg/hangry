import { EstablishmentTextData } from "../types/Establishment.types";
import { getGeopoint } from "../services/geocodingAPI";
import { GeoPoint } from "firebase/firestore";
// import { addEstablishmentDoc } from "../services/establishments";
import { useAddDocument } from "./useAddDocument";
import { newEstablishmentCol } from "../services/firebase";

const useAddEstablishment = () => {
  const { addDocument, error, loading } = useAddDocument();
  // use when updating as well :)

  const addEstablishment = async (data: EstablishmentTextData) => {
    // Get geopoint from address
    const payload = await getGeopoint(data.address, data.city);

    if (!payload) {
      throw new Error("No payload");
    }

    const newEstablishmentObj = {
      ...data,
      geopoint: new GeoPoint(payload.coords.lat, payload.coords.lng),
      place_id: payload.place_id,
    };

    // Add to DB incl geopoint
    addDocument(newEstablishmentCol, newEstablishmentObj);
  };
  return { addEstablishment, error, loading };
};

export default useAddEstablishment;
