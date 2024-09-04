import { Button } from "react-bootstrap";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import ListCard from "./ListCard";
import CloseIcon from "../../assets/images/close-x.png";

type CardListProps = {
  handleButtonClick: () => void;
  establishments: Establishment[];
  centerPosition: PositionCoords;
  city: string;
};

const CardList: React.FC<CardListProps> = ({
  handleButtonClick,
  establishments,
  centerPosition,
  city,
}) => {
  return (
    <div className="list-wrapper">
      <div className="list-top">
        <h2>{city}</h2>
        <Button onClick={handleButtonClick} className="close-button">
          <img src={CloseIcon} className="close-icon" />
        </Button>
      </div>

      <div className="list-group-container">
        {establishments.map((establishment) => (
          <ListCard
            key={establishment._id}
            establishment={establishment}
            centerPosition={centerPosition}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
