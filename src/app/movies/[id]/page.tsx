'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';

interface Movie {
    id: number;
    name: string;
    posterUrl: string;
    trailerUrl: string;
    description: string;
}

const MoviePage = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/movies/${id}`);
                if (response.ok) {
                    const data: Movie = await response.json();
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
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Film bulunamadı</div>;

    const handleReservationClick = () => {
        router.push(`/movies/${movie.id}/reservation`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="p-6">
                <h1 className="text-3xl font-bold">{movie.name}</h1>
                {movie.posterUrl ? (
                    <Image
                        src={movie.posterUrl}
                        alt={movie.name}
                        width={300}
                        height={450}
                    />
                ) : null}
                <p className="text-gray-700 mt-4">{movie.description}</p>
                {movie.trailerUrl ? (
                    <div className="mt-4">
                        <iframe
                            src={movie.trailerUrl}
                            width="640"
                            height="360"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title="Movie Trailer"
                        ></iframe>
                    </div>
                ) : (
                    <p>Trailer mevcut değil.</p>
                )}
                <button onClick={handleReservationClick} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Rezervasyon Yap
                </button>
            </main>
        </div>
    );
};

export default MoviePage;
