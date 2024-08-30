import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { EstablishmentFormData } from "../types/Establishment.types";
import useAddEstablishment from "../hooks/useAddEstablishment";
import EstablishmentForm from "../components/EstablishmentForm";
import useAddFiles from "../hooks/useAddFiles";
import useAuth from "../hooks/useAuth";


const AddEstablishmentPage = () => {
    const { currentUser } = useAuth()
    const { addEstablishment, error: establishmentError, loading: establishmentLoading } = useAddEstablishment();
    const { uploadPhotos, error: fileUploadError, loading: fileUploadLoading } = useAddFiles()

    // validate address to ensure it is possible to geocode!

    const handleFormSubmit = async (data: EstablishmentFormData) => {
        const { photos, ...documentData } = data;

        if (photos && photos.length > 0) {
            const photoUrls = await uploadPhotos(photos, "test-photos");
            documentData.photoUrls = photoUrls;
        }

        await addEstablishment(documentData);
    };

    return (
        <Container className="py-3 center-y">
            {establishmentError && (
                <div>{establishmentError}</div>
            )}
            {fileUploadError && (
                <div>{fileUploadError}</div>
            )}
            {establishmentLoading || fileUploadLoading && (
                <div>Loading...</div>
            )}

            {currentUser &&
                <Card className="mb-3 mt-5">
                    <Card.Body>
                        <Card.Title className="mb-3">Add Establishment</Card.Title>

                        <EstablishmentForm handleFormSubmit={handleFormSubmit} admin={currentUser} />
                    </Card.Body>
                </Card>
            }
        </Container>
    );
};

export default AddEstablishmentPage;
