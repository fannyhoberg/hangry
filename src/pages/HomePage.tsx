import { Container } from "react-bootstrap";
import Map from "../components/Map";

const HomePage = () => {
  return (
    <Container className="py-3 center-y">
      <div>
        <h1>Welcome to Hangry</h1>
        <Map />
      </div>
    </Container>
  );
};

export default HomePage;
