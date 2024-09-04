import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import { generateDirectionsURL } from "../../services/directionsAPI";
import CardCarousel from "./CardCarousel";

type ListCardProps = {
  centerPosition: PositionCoords;
  establishment: Establishment;
  handleClose?: () => void;
};

const noImageUrl = "https://fl-1.cdn.flockler.com/embed/no-image.svg";

const ListCard: React.FC<ListCardProps> = ({ centerPosition, establishment, handleClose }) => {
  const position: PositionCoords = {
    lat: establishment.geopoint.latitude,
    lng: establishment.geopoint.longitude,
  };

  const url = generateDirectionsURL(centerPosition, position);

  return (
    <Card className="list-card">
      {handleClose && (
        <Button onClick={handleClose} className="info-window-close">X</Button>
      )}
      {/* <div className="card-img-wrapper">
        {establishment.photoUrls ? (
          <Card.Img variant="top" src={establishment.photoUrls[0]} />
        ) : (
          <Card.Img variant="top" src={noImageUrl} />
        )}
      </div> */}
      <div className="card-img-wrapper">

        {establishment.photoUrls ? (
          <CardCarousel
            establishmentName={establishment.name}
            photoUrls={establishment.photoUrls}
          ></CardCarousel>
        ) : (
          <Card.Img variant="top" src={noImageUrl} />
        )}
      </div>

      <Card.Body>
        <Card.Title>{establishment.name}</Card.Title>
        <Card.Subtitle>{establishment.category.join(", ").toUpperCase()}</Card.Subtitle>
        {establishment.description && <Card.Text>{establishment.description}</Card.Text>}

        <Card.Text>
          {establishment.address}, {establishment.city}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <a href={url} className="btn btn-primary" target="_blank">
          Vägbeskrivning
        </a>
      </Card.Footer>
    </Card>
  );
};

export default ListCard;
