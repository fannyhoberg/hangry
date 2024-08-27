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
import { signUpType } from "../types/User.types";
import { FirebaseError } from "firebase/app";
// import { toast } from "react-toastify";

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<signUpType>();
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password ref
  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<signUpType> = async (data) => {
    setIsSubmitting(true);

    try {
      await signup(data.email, data.password);
      console.log("Something went wrong on Signup page");

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
                    <p className="invalid">
                      {errors.confirmPassword.message || "Invalid value"}
                    </p>
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
