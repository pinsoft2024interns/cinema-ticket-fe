'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

interface Movie {
    id: number; // id alanını number olarak güncelledik
    name: string;
    posterUrl: string;
    trailerUrl: string;
    description: string;
}

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/movies");
                if (response.ok) {
                    const data: Movie[] = await response.json();
                    setMovies(data);
                } else {
                    const errorText = await response.text();
                    setError(`Filmler alınamadı: ${errorText}`);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`Filmler alınırken hata: ${error.message}`);
                } else {
                    setError('Bilinmeyen bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.name}
                    posterUrl={movie.posterUrl}
                    description={movie.description}
                />
            ))}
        </div>
    );
};

export default MovieList;
