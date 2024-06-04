import React, { useEffect, useState } from 'react'
import Card from './Card';
import Link from 'next/link';
import { CardInfo } from '../../type'
import '../components/CardInfo.scss'


const CardInfoList = ({ reservationId, userId }: { reservationId: number | null; userId: number }) => {
    const [cards, setCards] = useState<CardInfo[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    console.log(reservationId,userId);
    

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`http://localhost:8080/card/user/${userId}`);


                if (response.ok) {
                    const data: CardInfo[] = await response.json();
                    setCards(data);
                } else {
                    const errorText = await response.text();
                    setError(`Katlar alınamadı: ${errorText}`);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`Kartlar alinirken hata: ${error.message}`);
                } else {
                    setError('Bilinmeyen bir hata oluştu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [userId]);


    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>

    return (
        <div className="card-info-list-container">
            <div className="card-info-list-header">
                <h2 className="card-info-list-title">Kartlarım</h2>
                <Link href={`/card-add/${userId}`}>
                    <span className="card-info-add-link">Kart Ekle</span>
                </Link>
            </div>
            <div className="card-info-cards">
                {cards.map((card) => (
                    <div className="card" key={card.id}>
                        <Card
                            id={card.id}
                            creditCardNumber={card.creditCardNumber}
                            cardHolderName={card.cardHolderName}
                            expirationDate={card.expirationDate}
                            cvv={card.cvv}
                            reservationId={reservationId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardInfoList