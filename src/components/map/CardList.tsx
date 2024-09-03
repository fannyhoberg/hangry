import { Establishment, PositionCoords } from "../../types/Establishment.types";
import ListCard from "./ListCard";

type CardListProps = {
  establishments: Establishment[];
  centerPosition: PositionCoords;
};

const CardList: React.FC<CardListProps> = ({ establishments, centerPosition }) => {
  return (
    <div className="list-group-container">
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
