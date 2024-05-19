'use client';

import Header from '@/components/Header';
import MovieList from '@/components/MovieList';

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Filmler</h1>
                <MovieList />
            </main>
        </div>
    );
};

export default HomePage;
