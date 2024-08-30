import { CollectionReference, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamDocument = <T>(
  colRef: CollectionReference<T>,
  docId: string | undefined
) => {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const documentRef = doc(colRef, docId);

    const unsubscribe = onSnapshot(documentRef, (snapshot) => {
      if (!snapshot.exists()) {
        setDocument(null);
        setError(true);
        setLoading(false);
        return;
      }

      const data = {
        ...snapshot.data(),
        _id: snapshot.id,
      };

      setDocument(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [colRef, docId]);

  return {
    document,
    error,
    loading,
  };
};

export default useStreamDocument;
