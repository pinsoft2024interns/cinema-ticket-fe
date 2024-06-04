import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Reservation {
    id: number
    seatInfo: number[];
    numberOfPeople: number;
    cancel: boolean;
}

const Cancel = ({ reservationId, userId }: { reservationId: number; userId: number }) => {



    const [reservation, setReservation] = useState<Reservation>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchShowings = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reservation/cancel/${reservationId}`,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );


                if (response.ok) {
                    const data: Reservation = await response.json();
                    setReservation(data);
                    setTimeout(() => router.push(`/profile/${userId}`), 4000)


                } else {
                    const errorText = await response.text();
                    setError(`İptal edilemedi: ${errorText}`);

                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`İptal edilirken hata meydana geldi: ${error.message}`);
                } else {
                    setError('Bilinmeyen bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchShowings();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>

    console.log(reservation);


    return (
        <div>
            {reservation?.cancel &&
                <>
                    <h1>Bilet iptal isteğiniz onaylandığında mailinize bilgilendirme mesajı gelcektir.</h1>
                    <p>Ana Sayfaya Yönlendiriliyorsunuz...</p>
                </>
            }
        </div>
    )
}

export default Cancel