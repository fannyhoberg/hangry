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

const UpdateProfilePage = () => {
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

  if (!currentUser) {
    return <p>Can't find currentUser...</p>;
  }

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

  console.log("userPhotoUrl", userPhotoUrl);

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const { data: userData } = useGetUserDoc(currentUser.uid);

  // Make sure userData is not empty and has the expected structure
  const userId = userData && userData.length > 0 ? userData[0]._id : null;

  // Create the document reference using the extracted _id
  const userDocRef = userId ? doc(db, "users", userId) : null;

  const onUpdate: SubmitHandler<UpdateProfileType> = async (data) => {
    try {
      setIsSubmitting(true);
      setIsError(false);

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
                    <p className="invalid">
                      {errors.photos.message || "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    type="text"
                    {...register("name", {
                      required: "Please enter your name.",
                    })}
                  />
                  {errors.name && (
                    <p className="invalid">
                      {errors.name.message || "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="my-email@email.com"
                    type="email"
                    {...register("email", {
                      required: "Please enter an email.",
                    })}
                  />
                  {errors.email && (
                    <p className="invalid">
                      {errors.email.message || "Invalid value"}
                    </p>
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
                        value: 3,
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="invalid">
                      {errors.password.message || "Invalid value"}
                    </p>
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
                        value: 3,
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
                    <p>{errors.confirmPassword.message || "Invalid value"}</p>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Updating profile..." : "Save"}
                </Button>

                {isUpdated && !isError && (
                  <p style={{ color: "green" }}>Profile is now updated</p>
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
