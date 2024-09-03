import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SignUpType } from "../types/User.types";
import { FirebaseError } from "firebase/app";
import { useAddDocument } from "../hooks/useAddDocument";
import { usersCol } from "../services/firebase";

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpType>();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { addDocument } = useAddDocument();

  // Password ref
  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<SignUpType> = async (data) => {
    setIsSubmitting(true);

    try {
      // Registrera användaren med Firebase Authentication
      const userCredential = await signup(data.email, data.password);
      const user = userCredential.user;

      // Lägg till användaren i Firestore-databasen
      await addDocument(usersCol, {
        _id: user.uid,
        email: user.email || "",
      });

      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Something went wrong, try again.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Sign Up</Card.Title>

              <Form onSubmit={handleSubmit(onSignup)} className="mb-3">
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
                      required: "Please enter a password",
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
                      required: "Enter your password again please.",
                      minLength: {
                        message: "Enter at least 6 characters",
                        value: 3,
                      },
                      validate: (value) => {
                        return (
                          value === passwordRef.current ||
                          "The passwords does not match, try again"
                        );
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message || "Invalid value"}</p>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
