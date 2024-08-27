import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";

const HomePage = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    navigate("/logout");
  };
  return (
    <Container className="py-3 center-y">
      <div>
        <h1>Welcome to Hangry</h1>
      </div>
    </Container>
  );
};

export default HomePage;
