import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { EstablishmentFormData } from "../types/Establishment.types";
import EstablishmentForm from "../components/EstablishmentForm";
import useAddFiles from "../hooks/useAddFiles";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useGetSuggestionByID from "../hooks/useGetSuggestionByID";

const ManageSuggestionsPage = () => {
    const { id } = useParams()
    const { currentUser } = useAuth()
    const { uploadPhotos, error: fileUploadError, loading: fileUploadLoading } = useAddFiles()
    const { document: suggestion, error: suggestionError, loading: loadingSuggestion } = useGetSuggestionByID(id);

    const handleFormSubmit = async (data: EstablishmentFormData) => {
        const { photos, ...documentData } = data;

        if (photos && photos.length > 0) {
            const photoUrls = await uploadPhotos(photos, "test-photos");
            documentData.photoUrls = photoUrls;
        }

        if (!id) {
            return;
        }

        // updateSuggestionDoc in db
    };

    const handleAddEstablishment = async (data: EstablishmentFormData) => {
        // add to ESTABLISHMENT collection in db
    }

    const handleDeleteSuggestion = async (data: EstablishmentFormData) => {
        // delete suggestion in db
    }

    return (
        <Container className="py-3 center-y">

            {suggestionError && (
                <div>{suggestionError}</div>
            )}

            {fileUploadError && (
                <div>{fileUploadError}</div>
            )}


            {fileUploadLoading || loadingSuggestion && (
                <div>Loading...</div>
            )}

            {/* IMAGE GALLERY WITH ESTABLISHMENT'S IMAGES
                AND FUNCTIONALITY TO DELETE IMAGES */}

            {currentUser && suggestion &&
                <Card className="mb-3 mt-5">
                    <Card.Body>
                        <Card.Title className="mb-3">Manage suggestion: {suggestion.name}</Card.Title>

                        <EstablishmentForm
                            admin={currentUser}
                            handleAddEstablishment={handleAddEstablishment}
                            handleDeleteSuggestion={handleDeleteSuggestion}
                            handleFormSubmit={handleFormSubmit}
                            initialValues={suggestion}
                            manageSuggestions
                        />
                    </Card.Body>
                </Card>
            }
        </Container>
    );
}

export default ManageSuggestionsPage
