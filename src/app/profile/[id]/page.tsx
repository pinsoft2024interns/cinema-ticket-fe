'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

interface Reservation {
    id: number;
    seatInfo: number[];
    numberOfPeople: number;
    price: number;
    releaseDate: string | null;
    hallNumber: number;
    cancel: boolean;
}

interface User {
    id: number;
    email: string;
    username: string;
    reservations: Reservation[];
}

const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    setError('JWT bulunamadı.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data: User = await response.json();
                    setUser(data);
                } else {
                    const errorText = await response.text();
                    setError(`Kullanıcı bulunamadı: ${errorText}`);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`Kullanıcı bilgileri alınırken hata: ${error.message}`);
                } else {
                    setError('Bilinmeyen bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div className="text-gray-900">Yükleniyor...</div>;
    if (error) return <div className="text-gray-900">{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Profil</h1>
                {user ? (
                    <>
                        <p className="text-gray-900 mb-4">Email: {user.email}</p>
                        <p className="text-gray-900 mb-4">Username: {user.username}</p>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Rezervasyonlarım</h2>
                        <ul className="list-disc pl-5">
                            {user.reservations.length === 0 ? (
                                <p className="text-gray-900">Hiç rezervasyonunuz yok.</p>
                            ) : (
                                user.reservations.map((reservation, index) => (
                                    <li key={index} className="text-gray-900 mb-2">
                                        <div>Rezervasyon ID: {reservation.id}</div>
                                        <div>Koltuk Numaraları: {reservation.seatInfo.join(', ')}</div>
                                        <div>Kişi Sayısı: {reservation.numberOfPeople}</div>
                                        <div>Fiyat: {reservation.price} TL</div>
                                        <div>Salon Numarası: {reservation.hallNumber}</div>
                                        <div>İptal Durumu: {reservation.cancel ? 'İptal Edildi' : 'Aktif'}</div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </>
                ) : (
                    <p className="text-gray-900">Kullanıcı bilgileri alınamadı.</p>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
