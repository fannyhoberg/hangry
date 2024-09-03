import Card from "react-bootstrap/Card";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import { generateDirectionsURL } from "../../services/directionsAPI";

type ListCardProps = {
  centerPosition: PositionCoords;
  establishment: Establishment;
};

const ListCard: React.FC<ListCardProps> = ({ centerPosition, establishment }) => {
  const position: PositionCoords = {
    lat: establishment.geopoint.latitude,
    lng: establishment.geopoint.longitude,
  };

  const url = generateDirectionsURL(centerPosition, position);

  return (
    <Card style={{ width: "18rem" }}>
      {establishment.photoUrls && <Card.Img variant="top" src={establishment.photoUrls[0]} />}
      <Card.Body>
        <Card.Title>{establishment.name}</Card.Title>
        <Card.Text>{establishment.category.join(", ").toUpperCase()}</Card.Text>
        <a href={url} className="btn btn-primary" target="_blank">
          Vägbeskrivning
        </a>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
