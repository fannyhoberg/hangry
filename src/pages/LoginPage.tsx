import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoginType } from "../types/User.types";
import { FirebaseError } from "firebase/app";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginType>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);
      console.log("You are logged in");
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
              <Card.Title className="mb-3">Log in</Card.Title>

              <Form onSubmit={handleSubmit(onLogin)} className="mb-3">
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="my-email@email.com"
                    type="email"
                    {...register("email", {
                      required: "Please enter your email.",
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
                      required: "Please enter your password",
                    })}
                  />
                  {errors.password && (
                    <p>{errors.password.message || "Invalid value"}</p>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Logging in..." : "Log in"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
