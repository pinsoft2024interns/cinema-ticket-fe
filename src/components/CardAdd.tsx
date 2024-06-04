import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import '../components/CardAdd.scss'


const CardAdd = ({ userId }: { userId: number }) => {

    const [creditCardNumber, setCreditCardNumber] = useState<string | undefined>()
    const [cvv, setCvv] = useState<string>()
    const [cardHolderName, setCardHolderName] = useState<string | undefined>()
    const [expirationDate, setExpirationDate] = useState<string | undefined>()
    const router = useRouter();



    async function handleCardAdd(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!cvv || !creditCardNumber || !cardHolderName || !expirationDate) {
            console.error('Lütfen tüm alanlari doldurun.');
            return;
        }
        try {
            const formData = {
                creditCardNumber,
                cardHolderName,
                expirationDate,
                cvv,
            };

            const response = await fetch(`http://localhost:8080/card/user/${userId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push(`/card-info/${userId}`);
            } else {
                const errorText = await response.text();
                console.error('Kart Ekleme Basarisiz:', response.statusText, 'Yanit metni:', errorText);
            }
        } catch (error) {
            console.error("Kart Eklerken Hata:", error);
        }
    }

    return (
        <div className="signup-form-container">
            <div className="signup-form-main">
                <h3 className="signup-header">Kart Ekle</h3>
                <form className="signup-form" onSubmit={handleCardAdd}>
                    <div className="signup-form-element">
                        <input
                            type="text"
                            placeholder="Kart Numarasi"
                            className="signup-form-input"
                            value={creditCardNumber}
                            onChange={(e) => setCreditCardNumber(e.target.value)}
                        />
                    </div>
                    <div className="signup-form-element">
                        <input
                            type="text"
                            placeholder="Kart Sahibi"
                            className="signup-form-input"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                        />
                    </div>
                    <div className="signup-form-element">
                        <input
                            type="text"
                            placeholder="Geçerli Tarih"
                            className="signup-form-input"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                    </div>

                    <div className="signup-form-element">
                        <input
                            type="text"
                            placeholder="Cvv"
                            className="signup-form-input"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup-form-button">
                        Kart Ekle
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CardAdd