import { establishmentCol } from "../services/firebase"
import useStreamCollection from "./useStreamCollection"

const useGetEstablishments = () => {
    return useStreamCollection(establishmentCol);
}

export default useGetEstablishments;