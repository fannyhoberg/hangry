import { Button } from "react-bootstrap";
import { Establishment, PositionCoords } from "../../types/Establishment.types";
import ListCard from "./ListCard";

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
  const sortedEstablishments = establishments.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="list-wrapper">
      <div className="list-top">
        <h2>{city}</h2>
        <Button
          onClick={handleButtonClick}
          className="close-button btn-secondary"
        >
          X
        </Button>
      </div>

      <div className="list-group-container">
        {sortedEstablishments.map((establishment) => (
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
