import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import EstablishmentForm from "../components/EstablishmentForm";
import { EstablishmentFormData } from "../types/Establishment.types";

export const AddSuggestionsPage = () => {
    const handleFormSubmit = async (suggestion: EstablishmentFormData) => {
        try {
            console.log("Suggestion: ", suggestion)
            // upload suggestion
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container className="py-3 center-y">
            <h1 className="h4 mt-4">Noticed any restaurant, cafe or pub missing on the map? Please give us suggestions!</h1>

            <Card className="mb-3 mt-5">
                <Card.Body>
                    <EstablishmentForm handleFormSubmit={handleFormSubmit} />
                </Card.Body>
            </Card>
        </Container>
    )
}
