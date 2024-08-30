import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { EstablishmentFormData } from "../types/Establishment.types";
import EstablishmentForm from "../components/EstablishmentForm";
import useAddFiles from "../hooks/useAddFiles";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import useGetEstablishMentByID from "../hooks/useGetEstablishMentByID";


const UpdateEstablishmentPage = () => {
    const { id } = useParams()
    const { currentUser } = useAuth()
    const { uploadPhotos, error: fileUploadError, loading: fileUploadLoading } = useAddFiles()
    const { document: establishment, error: establishmentError, loading: loadingEstablishment } = useGetEstablishMentByID(id);

    // Send info as initialvalues to establishment form
    // Update functionality

    const handleFormSubmit = async (data: EstablishmentFormData) => {
        const { photos, ...documentData } = data;

        if (photos && photos.length > 0) {
            const photoUrls = await uploadPhotos(photos, "test-photos");
            documentData.photoUrls = photoUrls;
        }

        // update in db
    };

    return (
        <Container className="py-3 center-y">

            {establishmentError && (
                <div>{establishmentError}</div>
            )}

            {fileUploadError && (
                <div>{fileUploadError}</div>
            )}

            {fileUploadLoading || loadingEstablishment && (
                <div>Loading...</div>
            )}

            {/* IMAGE GALLERY WITH ESTABLISHMENT'S IMAGES
                AND FUNCTIONALITY TO DELETE IMAGES */}

            {currentUser && establishment &&
                <Card className="mb-3 mt-5">
                    <Card.Body>
                        <Card.Title className="mb-3">Add Establishment</Card.Title>

                        <EstablishmentForm handleFormSubmit={handleFormSubmit} admin={currentUser} initialValues={establishment} />
                    </Card.Body>
                </Card>
            }
        </Container>
    );
};

export default UpdateEstablishmentPage;
