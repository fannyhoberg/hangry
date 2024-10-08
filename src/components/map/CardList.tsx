import { Button } from "react-bootstrap";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import ListCard from "./ListCard";
import CloseIcon from "../../assets/images/close-x.png";

type CardListProps = {
  handleButtonClick: () => void;
  establishments: Establishment[];
  centerPosition: PositionCoords;
  city: string;
  userLocation?: PositionCoords;
};

const CardList: React.FC<CardListProps> = ({
  handleButtonClick,
  establishments,
  centerPosition,
  city,
  userLocation
}) => {
  const sortedEstablishments = establishments.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="list-wrapper">
      <div className="list-top">
        <h2>{city}</h2>
        <Button onClick={handleButtonClick} className="close-button">
          <img src={CloseIcon} className="close-icon" />
        </Button>
      </div>

      <div className="list-group-container">
        {sortedEstablishments.map((establishment) => (
          <ListCard
            key={establishment._id}
            establishment={establishment}
            centerPosition={centerPosition}
            userPosition={userLocation}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
