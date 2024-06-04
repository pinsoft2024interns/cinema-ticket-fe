import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '../../type';
import './Movie.scss'



const MovieCard: React.FC<Movie> = ({ id, name, base64image, description }) => {
    return (
        <div className="movie-card">
            <div className={'image-container'}>
                {base64image && (
                    <Image
                        src={base64image}
                        alt={name}
                        layout="fill"
                        objectFit="contain"
                        className="movie-image"
                    />
                )}
            </div>
            <div className={'content'}>
                <h2 className="title">{name}</h2>
                <p className="description">{description}</p>
                <Link href={`/movies/${id}/showing`}>
                    <span className="link">Güncel Gösterimler</span>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
