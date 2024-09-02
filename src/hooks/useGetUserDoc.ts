import { where } from "firebase/firestore";
import { usersCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetUserDoc = (uid: string) => {
  return useStreamCollection(usersCol, where("_id", "==", uid));
};

export default useGetUserDoc;
