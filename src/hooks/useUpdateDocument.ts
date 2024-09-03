import {
  CollectionReference,
  doc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

export const useUpdateDocument = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDocument = async <NewDocumentType>(
    id: string,
    colRef: CollectionReference<NewDocumentType>,
    data: Partial<NewDocumentType>
  ) => {
    setIsLoading(true);
    const docRef = doc(colRef, id);
    try {
      await updateDoc<NewDocumentType, DocumentData>(docRef, data);
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
    updateDocument,
  };
};
