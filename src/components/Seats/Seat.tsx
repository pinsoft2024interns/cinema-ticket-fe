import React from 'react';
import '@/components/Seats/seats.css';
interface SeatProps {
    seat: {
        id: number;
        name: string;
        isOccupied: boolean;
    };
    onClick: (id: number) => void;
    isSelected: boolean;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick, isSelected }) => {
    return (
        <div
            className={`seat ${seat.isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => !seat.isOccupied && onClick(seat.id)}
        >
            {seat.name}
        </div>
    );
};

export default Seat;
