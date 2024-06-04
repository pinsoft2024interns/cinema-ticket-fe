'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../../type';
import './MovieList.scss'



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
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    name={movie.name}
                    base64image={movie.base64image}
                    description={movie.description}
                />
            ))}
        </div>
    );
};

export default MovieList;
