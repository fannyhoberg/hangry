import { Button } from "react-bootstrap";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import ListCard from "./ListCard";

type CardListProps = {
  handleButtonClick: () => void;
  establishments: Establishment[];
  centerPosition: PositionCoords;
};

const CardList: React.FC<CardListProps> = ({
  handleButtonClick,
  establishments,
  centerPosition,
}) => {
  return (
    <div className="list-group-container">
      <Button onClick={handleButtonClick} className="close-button">
        Stäng
      </Button>
      {establishments.map((establishment) => (
        <ListCard
          key={establishment._id}
          establishment={establishment}
          centerPosition={centerPosition}
        />
      ))}
    </div>
  );
};

export default CardList;
