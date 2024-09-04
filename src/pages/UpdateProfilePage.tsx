import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfileType } from "../types/User.types";
import useAddFiles from "../hooks/useAddFiles";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Alert } from "react-bootstrap";

const UpdateProfilePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const {
    currentUser,
    userEmail,
    userName,
    userPhotoUrl,
    reloadUser,
    setDisplayName,
    setEmail,
    setPassword,
    setPhotoUrl,
  } = useAuth();

  const { uploadPhotos } = useAddFiles();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileType>({
    defaultValues: {
      email: userEmail ?? "",
      name: userName ?? "",
    },
  });

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const { data: userData, loading } = useGetUserDoc(currentUser?.uid);

  // Make sure userData is not empty and has the expected structure
  const userId = userData && userData.length > 0 ? userData[0]._id : null;

  // Create the document reference using the extracted _id
  const userDocRef = userId ? doc(db, "users", userId) : null;

  const onUpdate: SubmitHandler<UpdateProfileType> = async (data) => {
    try {
      setIsSubmitting(true);
      setIsError(false);
      setError(null);

      if (userDocRef) {
        if (data.photos.length) {
          const photoFile = data.photos;
          const folder = `profile-pictures/${currentUser?.uid}`;

          try {
            const photoUrls = await uploadPhotos(photoFile, folder);

            if (photoUrls && photoUrls.length > 0) {
              const photoURL = photoUrls[0];
              await setPhotoUrl(photoURL);
              await updateDoc(userDocRef, { photoUrls: photoURL });
            }
          } catch (err) {
            setIsError(true);
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Something went wrong trying to update profile");
            }
            return;
          }
        }
      }

      if (userDocRef) {
        if (data.name !== (userName ?? "")) {
          await setDisplayName(data.name);
          await updateDoc(userDocRef, { name: data.name });
        }
      }

      if (data.email !== (userEmail ?? "")) {
        await setEmail(data.email);
      }

      if (data.password) {
        await setPassword(data.password);
      }

      reloadUser();
    } catch (err) {
      console.error("Error when updating the profile:", err);
      setIsError(true);
    }
    setIsSubmitting(false);

    setIsUpdated(true);
  };

  return (
    <Container className="py-3 center-y">
      {loading && <div className="loading">Loading...</div>}
      {isError && error && <div className="error">{error}</div>}

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Update profile</Card.Title>

              <div className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  <Image
                    src={userPhotoUrl || "https://via.placeholder.com/200"}
                    fluid
                    width={200}
                    height={200}
                    roundedCircle
                  />
                </div>
              </div>

              <Form onSubmit={handleSubmit(onUpdate)} className="mb-3">
                <Form.Group controlId="photos" className="mb-3">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    accept="image/gif,image/jpeg,image/png,image/webp"
                    type="file"
                    {...register("photos")}
                  />
                  {errors.photos && (
                    <Alert variant="warning">
                      {errors.photos.message || "Invalid"}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    autoComplete="name"
                    placeholder="Name"
                    type="text"
                    {...register("name")}
                  />
                  {errors.name && (
                    <Alert variant="warning">
                      {errors.name.message || "Invalid value"}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoComplete="email"
                    placeholder="my-email@email.com"
                    type="email"
                    {...register("email", {
                      required: "Please enter an email.",
                    })}
                  />
                  {errors.email && (
                    <Alert variant="warning">
                      {errors.email.message || "Invalid value"}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      minLength: {
                        message: "Enter at least 6 characters",
                        value: 6,
                      },
                    })}
                  />
                  {errors.password && (
                    <Alert variant="warning">
                      {errors.password.message || "Invalid value"}
                    </Alert>
                  )}
                  <Form.Text>At least 6 characters</Form.Text>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    {...register("confirmPassword", {
                      minLength: {
                        message: "Enter at least 6 characters",
                        value: 6,
                      },
                      validate: (value) => {
                        return (
                          !passwordRef.current ||
                          value === passwordRef.current ||
                          "The password does not match, please try again."
                        );
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <Alert variant="warning">
                      {errors.confirmPassword.message || "Invalid value"}
                    </Alert>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Updating profile..." : "Save"}
                </Button>

                {isUpdated && !isError && (
                  <Alert variant="success">Profile is now updated</Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfilePage;
