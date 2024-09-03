import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Establishment, EstablishmentFormData } from "../types/Establishment.types";
import EstablishmentForm from "../components/EstablishmentForm";
import useAddFiles from "../hooks/useAddFiles";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useGetEstablishMentByID from "../hooks/useGetEstablishMentByID";
import { useEffect, useState } from "react";
import { useUpdateEstablishment } from "../hooks/useUpdateEstablishment";
import { establishmentCol } from "../services/firebase";
import ImageCarousel from "../components/ImageCarousel";
import useDeleteEstablishment from "../hooks/useDeleteEstablishment";


const UpdateEstablishmentPage = () => {
    const { id } = useParams()
    const { currentUser } = useAuth()
    const { uploadPhotos, error: fileUploadError, loading: fileUploadLoading } = useAddFiles()
    const { document: establishment, error: establishmentError, loading: loadingEstablishment } = useGetEstablishMentByID(id);
    const [initialValues, setInitialValues] = useState<Partial<Establishment> | null>(null)
    const { updateEstablishment, error: updateError, isLoading: updateLoading } = useUpdateEstablishment();
    const { deleteDocument: deleteEstablishment, error: deleteError, isLoading: isLoadingDelete } = useDeleteEstablishment();
    const navigate = useNavigate();

    const handleDeleteEstablishment = async () => {
        if (!id) {
            return;
        }

        await deleteEstablishment(id, establishmentCol);
        navigate("/admin-dashboard")
    }

    const handleFormSubmit = async (data: EstablishmentFormData) => {
        const { photos, ...documentData } = data;

        if (photos && photos.length > 0) {
            const photoUrls = await uploadPhotos(photos, "test-photos");
            documentData.photoUrls = photoUrls;
        }

        if (!id) {
            return;
        }

        await updateEstablishment(id, establishmentCol, documentData)
    };

    useEffect(() => {
        setInitialValues(establishment)
    }, [establishment])

    return (
        <Container className="py-3 center-y">

            {establishmentError && (
                <div>{establishmentError}</div>
            )}

            {fileUploadError && (
                <div>{fileUploadError}</div>
            )}

            {updateError && (
                <div>{updateError}</div>
            )}

            {deleteError && (
                <div>{deleteError}</div>
            )}

            {fileUploadLoading || loadingEstablishment || updateLoading || isLoadingDelete && (
                <div>Loading...</div>
            )}

            {establishment && (
                <>
                    <h1 className="h4 mb-3">Manage establishment: </h1>
                    <h2 className="mb-4">{establishment.name}</h2>
                </>
            )}

            {/* IMAGE GALLERY WITH ESTABLISHMENT'S IMAGES
                AND FUNCTIONALITY TO DELETE IMAGES */}
            {establishment && establishment.photoUrls && (
                <ImageCarousel establishmentName={establishment.name} photoUrls={establishment.photoUrls} />
            )}

            {currentUser && initialValues &&
                <Card className="mb-3 mt-4">
                    <Card.Body>
                        <EstablishmentForm
                            admin={currentUser}
                            handleFormSubmit={handleFormSubmit}
                            handleDelete={handleDeleteEstablishment}
                            initialValues={initialValues}
                            manageEstablishment
                        />
                    </Card.Body>
                </Card>
            }
        </Container>
    );
};

export default UpdateEstablishmentPage;
