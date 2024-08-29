import { InfoWindow } from '@react-google-maps/api'
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
                <p>{info.name}</p>
            </div>
        </InfoWindow>
    )
}

export default MarkerInfoWindow
