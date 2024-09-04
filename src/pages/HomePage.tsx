import { Container, Image } from "react-bootstrap";
import Map from "../components/Map";
import HangryLogo from "../assets/images/hangry-logo.png";

const HomePage = () => {
  return (
    <Container className="py-3 center-y">
      <div>
        <div id="header-logo-wrapper">
          <Image src={HangryLogo} id="header-logo" />
        </div>
        <Map />
      </div>
    </Container>
  );
};

export default HomePage;
