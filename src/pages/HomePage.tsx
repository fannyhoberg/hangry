import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        <Button onClick={login}>Log in</Button>
        <Button onClick={logout}>Log out</Button>
      </div>
    </Container>
  );
};

export default HomePage;
