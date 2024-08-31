import { suggestionsCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetSuggestions = () => {
  return useStreamCollection(suggestionsCol);
};

export default useGetSuggestions;
