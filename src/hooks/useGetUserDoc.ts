import { where } from "firebase/firestore";
import { usersCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";
import { useMemo } from "react";

const useGetUserDoc = (uid: string | undefined) => {
  const queryConstraints = useMemo(() => {
    return uid ? [where("_id", "==", uid)] : [];
  }, [uid]);
  return useStreamCollection(usersCol, ...queryConstraints);
};

export default useGetUserDoc;
