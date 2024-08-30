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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../services/firebase";

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

  const onUpdate: SubmitHandler<UpdateProfileType> = async (data) => {
    try {
      setIsSubmitting(true);
      setIsError(false);

      if (data.photos.length) {
        const photo = data.photos[0];

        const fileRef = ref(
          storage,
          `photos/${currentUser?.uid}/${photo.name}`
        );

        try {
          const uploadRes = await uploadBytes(fileRef, photo);

          const photoURL = await getDownloadURL(uploadRes.ref);

          console.log("Photo URL", photoURL);

          await setPhotoUrl(photoURL);
        } catch (err) {
          console.error("Could not upload photo", err);
        }
      }

      if (data.name !== (userName ?? "")) {
        console.log("Updating display name...");
        await setDisplayName(data.name);
      }

      // Update email *ONLY* if it has changed
      if (data.email !== (userEmail ?? "")) {
        console.log("Updating email...");
        await setEmail(data.email);
      }

      // Update password *ONLY* if the user has provided a new password to set
      if (data.password) {
        console.log("Updating password...");
        await setPassword(data.password);
      }

      reloadUser();
    } catch (err) {
      console.error("Error thrown when updating user profile:", err);
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
