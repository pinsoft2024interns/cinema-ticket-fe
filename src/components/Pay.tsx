import { useRouter } from 'next/navigation';
import React from 'react'

const Pay = ({ cardInfoId, reservationId }: { cardInfoId: number; reservationId: number }) => {

    const router = useRouter();


    const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {
            const payData = {
                reservationId,
                cardInfoId,

            };

            const response = await fetch("http://localhost:8080/pay", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payData),
            });

            if (response.ok) {
                console.log("Ödeme Yapildi");
                router.push("/")

            } else {
                const errorText = await response.text();
                console.error('Ödeme basarisiz:', response.statusText, 'Yanit metni:', errorText);
            }
        } catch (error) {
            console.error("Ödeme yapilirken hata:", error);
        }
    };

    return (

        <form action="post" onSubmit={handleSumbit}>
            <button type="submit" className="signup-form-input w-full p-2 bg-blue-500 text-white rounded">
                Ödemeyi Onayla
            </button>
        </form>

    )
}

export default Pay