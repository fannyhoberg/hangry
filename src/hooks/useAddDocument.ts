import { FirebaseError } from "firebase/app";
import {
  CollectionReference,
  doc,
  DocumentData,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";

export const useAddDocument = () => {
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState(false);

  const addDocument = async <NewDocumentType>(
    colRef: CollectionReference<NewDocumentType>,
    data: NewDocumentType
  ) => {
    const docRef = doc(colRef);
    try {
      setLoading(true);
      await setDoc<NewDocumentType, DocumentData>(docRef, data);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong when trying to set a new document in DB"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return { addDocument, error, loading };
};
