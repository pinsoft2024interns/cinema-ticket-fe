"use client";
import React, { useEffect, useState } from 'react'
import Showing from './Showing';
import { Showings } from '../../type';

const ShowingList = ({ movieId }: { movieId: number }) => {

    const [showings, setShowings] = useState<Showings>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const fetchShowings = async () => {
            try {
                const response = await fetch(`http://localhost:8080/showing/movie/${movieId}`);


                if (response.ok) {
                    const data: Showings = await response.json();
                    setShowings(data);

                } else {
                    const errorText = await response.text();
                    setError(`Gösterimler alınamadı: ${errorText}`);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`Gösterim alinirken hata: ${error.message}`);
                } else {
                    setError('Bilinmeyen bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchShowings();
    }, [movieId]);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showings.map((showing) => (
                <Showing
                    key={showing.id}
                    id={showing.id}
                    showtime={showing.showtime}
                    ticketPrice={showing.ticketPrice}
                />
            ))}
        </div>
    )
}

export default ShowingList