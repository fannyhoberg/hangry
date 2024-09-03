import { usersCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetUsers = () => {
  return useStreamCollection(usersCol);
};

export default useGetUsers;
