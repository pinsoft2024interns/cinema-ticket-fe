'use client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { seats as initialSeats, reservations as initialReservations, Reservation, Seat } from '@/data/mockData';

type ReservationContextType = {
    getSeatsByMovie: (movieId: number) => Seat[];
    reservations: Reservation[];
    toggleSeat: (movieId: number, id: number) => void;
    saveReservation: (reservation: Reservation) => void;
    cancelReservation: (reservationId: number) => void;
    clearAllReservations: () => void;
    seats: { [key: number]: Seat[] }; // Added seats here
};

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [seats, setSeats] = useState<{ [key: number]: Seat[] }>({});
    const [reservations, setReservations] = useState<Reservation[]>(() => {
        if (typeof window !== 'undefined') {
            const storedReservations = localStorage.getItem('reservations');
            return storedReservations ? JSON.parse(storedReservations) : initialReservations;
        }
        return initialReservations;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('reservations', JSON.stringify(reservations));
        }
    }, [reservations]);

    const getSeatsByMovie = (movieId: number): Seat[] => {
        return seats[movieId] || initialSeats.map(seat => ({ ...seat, isOccupied: false }));
    };

    const toggleSeat = (movieId: number, id: number) => {
        setSeats((prevSeats: { [key: number]: Seat[] }) => {
            const movieSeats = prevSeats[movieId] || initialSeats;
            const updatedSeats = movieSeats.map((seat: Seat) =>
                seat.id === id ? { ...seat, isOccupied: !seat.isOccupied } : seat
            );
            return { ...prevSeats, [movieId]: updatedSeats };
        });
    };

    const saveReservation = (reservation: Reservation) => {
        setReservations(prevReservations => [...prevReservations, reservation]);
        setSeats(prevSeats => {
            const movieSeats = prevSeats[reservation.movieId] || initialSeats;
            const updatedSeats = movieSeats.map(seat => ({
                ...seat,
                isOccupied: reservation.seats.some(s => s.id === seat.id) ? true : seat.isOccupied
            }));
            return { ...prevSeats, [reservation.movieId]: updatedSeats };
        });
    };

    const cancelReservation = (reservationId: number) => {
        setReservations(prevReservations => {
            const reservation = prevReservations.find(r => r.id === reservationId);
            if (reservation) {
                setSeats(prevSeats => {
                    const movieSeats = prevSeats[reservation.movieId] || initialSeats;
                    const updatedSeats = movieSeats.map(seat => ({
                        ...seat,
                        isOccupied: reservation.seats.some(s => s.id === seat.id) ? false : seat.isOccupied
                    }));
                    return { ...prevSeats, [reservation.movieId]: updatedSeats };
                });
                return prevReservations.filter(r => r.id !== reservationId);
            }
            return prevReservations;
        });
    };

    const clearAllReservations = () => {
        setReservations([]);
        setSeats(prevSeats => {
            const updatedSeats: { [key: number]: Seat[] } = { ...prevSeats };
            Object.keys(updatedSeats).forEach(movieId => {
                updatedSeats[parseInt(movieId)] = updatedSeats[parseInt(movieId)].map(seat => ({
                    ...seat,
                    isOccupied: false
                }));
            });
            return updatedSeats;
        });
    };

    return (
        <ReservationContext.Provider value={{ getSeatsByMovie, reservations, toggleSeat, saveReservation, cancelReservation, clearAllReservations, seats }}>
            {children}
        </ReservationContext.Provider>
    );
};

export const useReservation = () => {
    const context = React.useContext(ReservationContext);
    if (!context) {
        throw new Error('useReservation must be used within a ReservationProvider');
    }
    return context;
};
