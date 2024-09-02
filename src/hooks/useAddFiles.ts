import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../services/firebase";
import { useState } from "react";

const useAddFiles = () => {
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState(false);

  const uploadPhotos = async (photoFiles: FileList, folder: string) => {
    const photos = [...photoFiles];

    try {
      setLoading(true);
      const uploadPhotosPromises = photos.map((photo) => {
        return new Promise<string>((resolve, reject) => {
          const fileRef = ref(storage, folder + "/" + photo.name);

          const uploadTask = uploadBytesResumable(fileRef, photo);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log("snapshot", snapshot.bytesTransferred);
            },
            (err) => {
              setError(err.message);
              reject(err);
            },
            async () => {
              const photoUrl = await getDownloadURL(fileRef);
              resolve(photoUrl);
            }
          );
        });
      });

      const photoUrls = await Promise.all(uploadPhotosPromises);
      return photoUrls;
    } catch (err) {
      if (err instanceof StorageError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong trying to upload files");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    uploadPhotos,
  };
};

export default useAddFiles;
