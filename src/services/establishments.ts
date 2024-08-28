import { doc, DocumentData, setDoc } from "firebase/firestore";
import { NewEstablishment } from "../types/Establishment.types";
import { newEstablishmentCol } from "./firebase";

export const addEstablishmentDoc = async (data: NewEstablishment) => {
  const docRef = doc(newEstablishmentCol);

  await setDoc<NewEstablishment, DocumentData>(docRef, data);
};
