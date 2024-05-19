import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MovieCardProps {
    id: number;
    title: string;
    posterUrl: string;
    description: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterUrl, description }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            {posterUrl ? (
                <Image
                    src={posterUrl}
                    alt={title}
                    width={300}
                    height={450}
                    className="w-full h-64 object-cover mb-4"
                />
            ) : null}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <Link href={`/movies/${id}`}>
                <span className="text-blue-500 hover:underline">Detaylar</span>
            </Link>
        </div>
    );
};

export default MovieCard;
