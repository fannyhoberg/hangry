import { CollectionReference, GeoPoint } from "firebase/firestore";
import { getGeopoint } from "../services/geocodingAPI";
import { useUpdateDocument } from "./useUpdateDocument";
import {
  Establishment,
  EstablishmentTextData,
} from "../types/Establishment.types";

export const useUpdateEstablishment = () => {
  const { updateDocument, error, isLoading } = useUpdateDocument();

  const updateEstablishment = async (
    id: string,
    colRef: CollectionReference<Establishment>,
    data: EstablishmentTextData
  ) => {
    // Get geopoint from address
    const payload = await getGeopoint(data.address, data.city);

    if (!payload) {
      throw new Error("No payload");
    }

    const updatedEstablishmentObj = {
      ...data,
      geopoint: new GeoPoint(payload.coords.lat, payload.coords.lng),
    };

    updateDocument(id, colRef, updatedEstablishmentObj);
  };
  return { updateEstablishment, error, isLoading };
};
