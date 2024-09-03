import { FirebaseError } from "firebase/app";
import { CollectionReference, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

const useDeleteDocument = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteDocument = async <DocumentType>(
    id: string,
    colRef: CollectionReference<DocumentType>
  ) => {
    setIsLoading(true);
    const docRef = doc(colRef, id);

    try {
      await deleteDoc(docRef);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong trying to delete document.");
      }
    }
  };

  return {
    deleteDocument,
    error,
    isLoading,
  };
};

export default useDeleteDocument;
