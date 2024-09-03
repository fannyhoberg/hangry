import { suggestionsCol } from "../services/firebase";
import useStreamDocument from "./useStreamDocument";

const useGetSuggestionByID = (suggestionId: string | undefined) => {
  return useStreamDocument(suggestionsCol, suggestionId);
};

export default useGetSuggestionByID;
