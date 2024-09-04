import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import { generateDirectionsURL } from "../../services/directionsAPI";
import CardCarousel from "./CardCarousel";
import CloseIcon from "../../assets/images/close-x.png";

type ListCardProps = {
  centerPosition: PositionCoords;
  establishment: Establishment;
  handleClose?: () => void;
  userPosition?: PositionCoords;
};

const noImageUrl = "https://fl-1.cdn.flockler.com/embed/no-image.svg";

const ListCard: React.FC<ListCardProps> = ({
  centerPosition,
  establishment,
  handleClose,
  userPosition,
}) => {
  const origin = userPosition ?? centerPosition;

  const destinationCoords: PositionCoords = {
    lat: establishment.geopoint.latitude,
    lng: establishment.geopoint.longitude,
  };

  const url = establishment.place_id
    ? generateDirectionsURL(origin, destinationCoords, establishment.place_id)
    : generateDirectionsURL(origin, destinationCoords);

  return (
    <Card className="list-card" key={establishment._id}>
      {handleClose && (
        <Button onClick={handleClose} className="info-window-close close-button">
          <img src={CloseIcon} className="close-icon" />
        </Button>
      )}
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
        <div className="tags">
          {establishment.offer &&
            establishment.offer.map((offer) => <p className="tag">{offer}</p>)}
        </div>

        <Card.Title>{establishment.name}</Card.Title>
        <Card.Subtitle>{establishment.category.join(", ").toUpperCase()}</Card.Subtitle>
        {establishment.description && <Card.Text>{establishment.description}</Card.Text>}

        {establishment.phone && <p>Tel: {establishment.phone}</p>}
        {establishment.email && <p>Email: {establishment.email}</p>}

        <Card.Text>
          {establishment.address}, {establishment.city}
          <br />
          {establishment.website && <a href={establishment.website}>{establishment.website}</a>}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <a href={url} className="btn btn-primary" target="_blank">
          Vägbeskrivning <i className="fa-solid fa-angle-right"></i>
        </a>
        {establishment.instagram && (
          <a
            href={`https://instagram.com/${establishment.instagram}`}
            className="btn btn-primary"
            target="_blank"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ListCard;
