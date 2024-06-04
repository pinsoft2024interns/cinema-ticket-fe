'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReservationProps } from '../../type';
import './Reservation.scss'



const ReservationForm = ({ showingId, userId  }: ReservationProps) => {

    const [numberOfPeopleString, setNumberOfPeopleString] = useState<string | undefined>()
    const [seatInfoString, setSeatInfoString] = useState<string | undefined>()
    const [seatInfo, setSeatInfo] = useState<number[] | undefined>()
    const router = useRouter();




    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        const numberOfPeople = Number(numberOfPeopleString)
        
        if(seatInfoString != null) {
            setSeatInfo(seatInfoString.split(',').map(Number))
        }
        
        e.preventDefault();
        if (!numberOfPeopleString || !seatInfoString) {
            console.error('Lütfen tüm alanlari doldurun.');
            return;
        }
        try {
            const formData = {
                numberOfPeople,
                seatInfo,
                userId,
                showingId
            };

            const response = await fetch("http://localhost:8080/reservation", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push(`/profile/${userId}`);
            } else {
                const errorText = await response.text();
                console.error('Kayıt başarısız:', response.statusText, 'Yanıt metni:', errorText);
            }
        } catch (error) {
            console.error("Kayıt yapılırken hata:", error);
        }
    };

    
    return (
        <div className="signup-form-container">
        <div className="bg-white">
            <h3 className="text-2xl">Rezervasyon Yap</h3>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="signup-form-element">
                    
                    <input
                        type="number"
                        placeholder="Koltuk Sayisi"
                        className="signup-form-input"
                        value={numberOfPeopleString}
                        onChange={(e) => setNumberOfPeopleString(e.target.value)}
                    />
                </div>
                <div className="signup-form-element">
                    <input
                        type="text"
                        placeholder="seat info"
                        className="signup-form-input"
                        value={seatInfoString}
                        onChange={(e) => setSeatInfoString(e.target.value)}
                    />
                </div>
               
                <button type="submit" className="signup-form-button">
                    Rezervasyon Yap 
                </button>
            </form>
        </div>
    </div>
    );
};

export default ReservationForm