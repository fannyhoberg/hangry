import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { EstablishmentFormData } from "../types/Establishment.types";
import useAddEstablishment from "../hooks/useAddEstablishment";
import { storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EstablishmentForm from "../components/EstablishmentForm";


const AddEstablishmentPage = () => {

    const { addEstablishment } = useAddEstablishment();

    // validate address to ensure it is possible to geocode!

    const uploadPhotos = async (photoFiles: FileList) => {
        console.log(photoFiles)
        const photos = [...photoFiles];

        const uploadPhotosPromises = photos.map(photo => {
            return new Promise<string>((resolve, reject) => {

                const fileRef = ref(storage, "test-photos/" + photo.name);

                const uploadTask = uploadBytesResumable(fileRef, photo);

                uploadTask.on("state_changed", (snapshot) => {
                    console.log(snapshot.bytesTransferred)
                }, (err) => {
                    console.error(err.message)
                    reject(err)
                }, async () => {
                    const photoUrl = await getDownloadURL(fileRef);
                    console.log("Photo URL is: ", photoUrl);
                    resolve(photoUrl)
                })
            })
        })
        const photoUrls = await Promise.all(uploadPhotosPromises)
        return photoUrls;
    }

    const handleFormSubmit = async (data: EstablishmentFormData) => {
        const { photos, ...documentData } = data;

        try {

            if (photos && photos.length > 0) {
                const photoUrls = await uploadPhotos(photos);
                documentData.photoUrls = photoUrls;
            }

            await addEstablishment(documentData);

        } catch (error) {
            // HANDLE ERROR BETTER
            console.log(error);
        }

    };

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
