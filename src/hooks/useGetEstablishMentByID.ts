import { establishmentCol } from "../services/firebase";
import useStreamDocument from "./useStreamDocument";

const useGetEstablishMentByID = (establishmentId: string | undefined) => {
  return useStreamDocument(establishmentCol, establishmentId);
};

export default useGetEstablishMentByID;
