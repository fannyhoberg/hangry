import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { EstablishmentFormData } from "../types/Establishment.types";
import useAddEstablishment from "../hooks/useAddEstablishment";
import EstablishmentForm from "../components/EstablishmentForm";
import useAddFiles from "../hooks/useAddFiles";


const AddEstablishmentPage = () => {

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

    if (establishmentError) {
        return <div>{establishmentError}</div>
    }

    if (fileUploadError) {
        return <div>{fileUploadError}</div>
    }

    if (establishmentLoading || fileUploadLoading) {
        console.log("HALLÅ")
        return <div>Loading...</div>
    }

    return (
        <Container className="py-3 center-y">
            <Card className="mb-3 mt-5">
                <Card.Body>
                    <Card.Title className="mb-3">Add Establishment</Card.Title>

                    <EstablishmentForm handleFormSubmit={handleFormSubmit} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddEstablishmentPage;
