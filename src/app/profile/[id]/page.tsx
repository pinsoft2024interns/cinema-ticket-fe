"use client"
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ReservationCard from '@/components/ReservationCard';
import '../../../components/Profile.scss';
import { User } from '../../../../type';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

        if (id) {
            fetchUser();
        }
    }, []);

    if (loading) return <div className={'text-gray-900'}>Yükleniyor...</div>;
    if (error) return <div className={'text-gray-900'}>{error}</div>;

    return (
        <div className={'profile-page-container'}>
            <Header />
            <main className={'profile-main'}>
                <h1 className={'profile-title'}>Profil</h1>
                <ul className={'reservation-list '}>
                    {user && (
                        <li className={'reservation-item'}>
                            <div className={'profile-header'}>
                                <p className={'profile-info'}>Email: {user.email}</p>
                                <p className={'profile-info'}>Username: {user.username}</p>
                                <Link href={`/card-info`}>
                                    <span className={'card-info'}> Kartlarım</span>
                                </Link>
                            </div>

                        </li>
                    )}

                </ul>
                <div className={'profile-reservations'}>
                    <h2 className={'profile-title'}>Rezervasyonlarım</h2>
                    <ul className={'reservation-list'}>
                        {user && user.reservations.length === 0 ? (
                            <p className={'profile-info'}>Hiç rezervasyonunuz yok.</p>
                        ) : (
                            user!.reservations.map((reservation, index) => (
                                <li className={'reservation-item'} key={index}>
                                    <ReservationCard
                                        key={reservation.id}
                                        reservationId={reservation.id}
                                        seatInfo={reservation.seatInfo.join(', ')}
                                        numberOfPeople={reservation.numberOfPeople}
                                        isCancel={reservation.cancel}
                                        amount={reservation.payment?.amount!}
                                        paymentDate={reservation.payment?.paymentDate!}
                                        userId={user!.id}
                                    />
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
