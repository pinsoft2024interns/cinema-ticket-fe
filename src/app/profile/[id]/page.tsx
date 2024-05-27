'use client';

import { useReservation } from '@/context/ReservationContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

const ProfilePage = () => {
    const { reservations, cancelReservation } = useReservation();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<{ id: number; email: string; username: string } | null>(null);
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
                    const data = await response.json();
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

    const userReservations = reservations.filter(reservation => reservation.userId === parseInt(id, 10));

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
                            {userReservations.length === 0 ? (
                                <p className="text-gray-900">Hiç rezervasyonunuz yok.</p>
                            ) : (
                                userReservations.map((reservation, index) => (
                                    <li key={index} className="text-gray-900 mb-2">
                                        <div>Rezervasyon ID: {reservation.id}</div>
                                        <div>Koltuk Numaraları: {reservation.seats.map(seat => seat.name).join(', ')}</div>
                                        <div>Kişi Sayısı: {reservation.seats.length}</div>
                                        <div>Fiyat: {reservation.totalPrice} TL</div>
                                        <div>Rezervasyon Durumu: {reservation.status ? 'Aktif' : 'İptal Edildi'}</div>
                                        {reservation.status && (
                                            <button
                                                onClick={() => cancelReservation(reservation.id)}
                                                className="mt-2 bg-red-500 text-white p-2 rounded"
                                            >
                                                İptal Et
                                            </button>
                                        )}
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
