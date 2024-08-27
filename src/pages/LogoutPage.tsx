import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logOutUser = async () => {
      await logout();
      console.log("You are being logged out");

      await new Promise((r) => setTimeout(r, 2000));

      navigate("/login");
    };
    logOutUser();
  }, [logout, navigate]);
  return (
    <Container className="py-3 center-y">
      <div>You are being logged out...</div>
    </Container>
  );
};

export default LogoutPage;
