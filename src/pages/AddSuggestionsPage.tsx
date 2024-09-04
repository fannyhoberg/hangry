import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import EstablishmentForm from "../components/EstablishmentForm";
import { EstablishmentTextData } from "../types/Establishment.types";
import { useAddDocument } from "../hooks/useAddDocument";
import { newSuggestionsCol } from "../services/firebase";

export const AddSuggestionsPage = () => {
  const { addDocument, error, loading } = useAddDocument();

  const handleFormSubmit = async (suggestion: EstablishmentTextData) => {
    try {
      addDocument(newSuggestionsCol, suggestion);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="py-3 center-y">
      <h1 className="h4 mt-4">
        Noticed any restaurant, cafe or pub missing on the map? Please give us suggestions!
      </h1>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Card className="mb-3 mt-5">
        <Card.Body>
          <EstablishmentForm handleFormSubmit={handleFormSubmit} />
        </Card.Body>
      </Card>
    </Container>
  );
};
