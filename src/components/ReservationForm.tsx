'use client';

import { useState } from 'react';
import { users } from '@/data/users';

type ReservationFormProps = {
    movieId: string;
    userId: string;
};

const ReservationForm = ({ movieId, userId }: ReservationFormProps) => {
    const [numSeats, setNumSeats] = useState<number>(1);

    const handleReservation = () => {
        const user = users.find((u) => u.id === userId);
        if (user) {
            user.reservations.push({ movieId, numSeats });
            alert('Rezervasyon başarılı!');
        } else {
            alert('Kullanıcı bulunamadı.');
        }
    };

    return (
        <div>
            <label className="block mb-2">
                Koltuk Sayısı:
                <input
                    type="number"
                    value={numSeats}
                    onChange={(e) => setNumSeats(Number(e.target.value))}
                    min="1"
                    className="w-full p-2 border rounded mt-2"
                />
            </label>
            <button onClick={handleReservation} className="bg-blue-500 text-white p-2 rounded mt-4">
                Rezervasyon Yap
            </button>
        </div>
    );
};

export default ReservationForm;
