import { InfoWindow } from '@react-google-maps/api'
import Image from "react-bootstrap/Image"
import React from 'react'
import { Establishment, PositionCoords } from '../../types/Establishment.types';

interface MarkerInfoWindowProps {
    handleClose: () => void;
    position: PositionCoords;
    info: Establishment;
}

const MarkerInfoWindow: React.FC<MarkerInfoWindowProps> = ({ handleClose, position, info }) => {

    return (
        <InfoWindow
            onCloseClick={handleClose}
            position={position}
        >
            <div>
                {info.photoUrls &&
                    <Image
                        src={info.photoUrls[0]}
                        rounded
                        className="mb-3"
                    />}
                <h6>{info.name}</h6>
                <span>{info.address}</span>
                <hr className="mt-2 mb-2" />
                <p className="mb-1">{info.category.join(", ").toUpperCase()}</p>
            </div>

        </InfoWindow>
    )
}

export default MarkerInfoWindow
