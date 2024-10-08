import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { EstablishmentFormData } from "../types/Establishment.types";
import EstablishmentForm from "../components/EstablishmentForm";
import useAddFiles from "../hooks/useAddFiles";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useGetSuggestionByID from "../hooks/useGetSuggestionByID";
import useUpdateSuggestion from "../hooks/useUpdateSuggestion";
import { suggestionsCol } from "../services/firebase";
import useAddEstablishment from "../hooks/useAddEstablishment";
import useDeleteSuggestion from "../hooks/useDeleteSuggestion";
import { Alert } from "react-bootstrap";
import { useState } from "react";

const ManageSuggestionsPage = () => {
  const { id } = useParams();
  const [deleteItem, setDeleteItem] = useState(false);
  const { currentUser } = useAuth();
  const { uploadPhotos, error: fileUploadError, loading: fileUploadLoading } = useAddFiles();
  const {
    document: suggestion,
    error: suggestionError,
    loading: loadingSuggestion,
  } = useGetSuggestionByID(id);
  const {
    updateDocument: updateSuggestion,
    error: updateError,
    isLoading: isLoadingUpdate,
  } = useUpdateSuggestion();
  const {
    addEstablishment,
    error: addEstablishmentError,
    loading: loadingEstablishment,
  } = useAddEstablishment();
  const {
    deleteDocument: deleteSuggestion,
    error: deleteError,
    isLoading: isLoadingDelete,
  } = useDeleteSuggestion();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: EstablishmentFormData) => {
    const { photos, ...documentData } = data;

    if (photos && photos.length > 0) {
      const photoUrls = await uploadPhotos(photos, "test-photos");
      documentData.photoUrls = photoUrls;
    }

    if (!id) {
      return;
    }

    await updateSuggestion(id, suggestionsCol, documentData);
  };

  const handleAddEstablishment = async (data: EstablishmentFormData) => {
    const { photos, ...documentData } = data;

    if (photos && photos.length > 0) {
      const photoUrls = await uploadPhotos(photos, "test-photos");
      documentData.photoUrls = photoUrls;
    }

    if (!id) {
      return;
    }

    await addEstablishment(documentData);

    await deleteSuggestion(id, suggestionsCol);

    navigate("/admin-dashboard");
  };

  const handleDeleteSuggestion = async () => {
    if (!id) {
      return;
    }

    await deleteSuggestion(id, suggestionsCol);
    setDeleteItem(true);
    navigate("/admin-dashboard");
  };

  return (
    <Container className="py-3 center-y">
      {suggestionError ||
        fileUploadError ||
        updateError ||
        addEstablishmentError ||
        (deleteError && <Alert variant="warning">Something went wrong...</Alert>)}

      {fileUploadLoading ||
        loadingSuggestion ||
        isLoadingUpdate ||
        loadingEstablishment ||
        (isLoadingDelete && <div>Loading...</div>)}

      {deleteItem && <Alert variant="success">Delete successful!</Alert>}

      {currentUser && suggestion && (
        <Card className="mb-3 mt-5">
          <Card.Body>
            <Card.Title className="mb-3">Manage suggestion: {suggestion.name}</Card.Title>

            <EstablishmentForm
              admin={currentUser}
              handleAddEstablishment={handleAddEstablishment}
              handleDelete={handleDeleteSuggestion}
              handleFormSubmit={handleFormSubmit}
              initialValues={suggestion}
              manageSuggestions
            />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ManageSuggestionsPage;
