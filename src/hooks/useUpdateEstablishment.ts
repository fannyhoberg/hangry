import { doc, updateDoc } from "firebase/firestore";
import { Establishment } from "../types/Establishment.types";
import { establishmentCol } from "../services/firebase";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

export const useUpdateEstablishment = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateEstablishment = async (
    id: string,
    documentData: Partial<Establishment>
  ) => {
    setIsLoading(true);
    const docRef = doc(establishmentCol, id);
    try {
      await updateDoc(docRef, documentData);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong trying to update the document");
      }
    }
    setIsLoading(false);
  };

  return {
    error,
    isLoading,
    updateEstablishment,
  };
};
