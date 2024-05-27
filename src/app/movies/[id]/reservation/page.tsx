'use client';

import { useReservation } from '@/context/ReservationContext';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Seat from '@/components/Seats/Seat';
import { Seat as SeatType } from '@/data/mockData';
import Modal from '@/components/Modal/Modal';
import '@/components/Seats/seats.css';
import '@/components/Modal/modal.css';
import Header from "@/components/Header";

const ReservationPage: React.FC = () => {
    const { getSeatsByMovie, toggleSeat, seats } = useReservation();
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState<{ id: string } | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
    const [movie, setMovie] = useState<{ posterUrl: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const movieId = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            router.push('/login');
        }

        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/movies/${movieId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched movie:', data); // Debugging log
                    setMovie(data);
                } else {
                    const errorText = await response.text();
                    setError(`Film bulunamadı: ${errorText}`);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`Film alınırken hata: ${error.message}`);
                } else {
                    setError('Bilinmeyen bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId, router]);

    useEffect(() => {
        if (movieId) {
            const seatsData = getSeatsByMovie(parseInt(movieId));
            console.log('Seats data:', seatsData); // Debugging log
        }
    }, [movieId, getSeatsByMovie]);

    const handleSeatClick = (movieId: string, id: number) => {
        const movieIdNumber = parseInt(movieId, 10);
        toggleSeat(movieIdNumber, id);
        if (seats[movieIdNumber]) {
            const seat = seats[movieIdNumber].find((seat: SeatType) => seat.id === id);
            if (seat) {
                setSelectedSeats((prev: SeatType[]) =>
                    prev.find((s: SeatType) => s.id === id) ? prev.filter((s: SeatType) => s.id !== id) : [...prev, seat]
                );
            }
        }
    };

    const handleSaveReservation = () => {
        if (!user) return;

        const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

        const newReservation = {
            id: Date.now(),
            status: true,
            totalPrice: totalPrice,
            userId: parseInt(user.id, 10),
            movieId: parseInt(movieId, 10),
            seats: selectedSeats
        };

        const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        existingReservations.push(newReservation);

        localStorage.setItem('reservations', JSON.stringify(existingReservations));

        setIsModalOpen(true);
    };

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return null;
    if (!movie) return <div>Film bulunamadı</div>;

    const seatsData = getSeatsByMovie(parseInt(movieId));

    return (
        <div className="container mx-auto p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4">Reservation Page for User {params.id}</h1>
            <div className="mb-4">
                {movie.posterUrl ? (
                    <Image src={movie.posterUrl} alt="Movie Poster" width={300} height={450} unoptimized />
                ) : (
                    <div>Poster not available</div>
                )}
            </div>
            <div className="screen">Screen</div>
            <div className="seats">
                <div className="row">
                    {seatsData.filter(seat => seat.name.startsWith('A')).map((seat, index) => (
                        <div key={seat.id} className={`seat-container ${index === 4 ? 'gap' : ''}`}>
                            <Seat
                                seat={seat}
                                onClick={() => handleSeatClick(movieId, seat.id)}
                                isSelected={selectedSeats.some(s => s.id === seat.id)}
                            />
                        </div>
                    ))}
                </div>
                <div className="row">
                    {seatsData.filter(seat => seat.name.startsWith('B')).map((seat, index) => (
                        <div key={seat.id} className={`seat-container ${index === 4 ? 'gap' : ''}`}>
                            <Seat
                                seat={seat}
                                onClick={() => handleSeatClick(movieId, seat.id)}
                                isSelected={selectedSeats.some(s => s.id === seat.id)}
                            />
                        </div>
                    ))}
                </div>
                <div className="row">
                    {seatsData.filter(seat => seat.name.startsWith('C')).map((seat, index) => (
                        <div key={seat.id} className={`seat-container ${index === 4 ? 'gap' : ''}`}>
                            <Seat
                                seat={seat}
                                onClick={() => handleSeatClick(movieId, seat.id)}
                                isSelected={selectedSeats.some(s => s.id === seat.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Selected Seats</h2>
                <ul>
                    {selectedSeats.map(seat => (
                        <li key={seat.id}>{seat.name} - ${seat.price}</li>
                    ))}
                </ul>
                <p className="text-lg font-bold mt-2">Total Price: ${totalPrice}</p>
                <button onClick={handleSaveReservation} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Save Reservation
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold">Rezervasyon başarılı!</h2>
                <p>Rezervasyonunuz başarıyla oluşturuldu.</p>
            </Modal>
        </div>
    );
};

export default ReservationPage;
