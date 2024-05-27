import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/components/movies.css';

interface MovieCardProps {
    id: number;
    title: string;
    posterUrl: string;
    description: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterUrl, description }) => {
    return (
        <div className="movie-card">
            <div className="w-full h-64 relative mb-4">
                <Image
                    src={posterUrl}
                    alt={title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded"
                />
            </div>
            <h2 className="movie-title">{title}</h2>
            <p className="movie-description">{description}</p>
            <Link href={`/movies/${id}`} className="movie-link">
                Detaylar
            </Link>
        </div>
    );
};

export default MovieCard;
