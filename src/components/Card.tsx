import Link from 'next/link';
import React from 'react'
import '../components/Card.scss'
import { CardProps } from '../../type'


const Card = ({ id, cardHolderName, creditCardNumber, cvv, expirationDate, reservationId }: CardProps) => {


    
    return (

        <div className="card">
            <div className="card-info">
                <p className="card-info-label">Kart Numarası:</p>
                <p className="card-info-value">{creditCardNumber}</p>
                <p className="card-info-label">Kart Sahibi:</p>
                <p className="card-info-value">{cardHolderName}</p>
                <p className="card-info-label">Son Kullanma Tarihi:</p>
                <p className="card-info-value">{expirationDate}</p>
                <p className="card-info-label">CVV:</p>
                <p className="card-info-value">{cvv}</p>
            </div>
            {
                reservationId != null && <Link href={`/pay/${id}/${reservationId}`}>
                    <span className="payment-link">Ödeme Yap</span>
                </Link>
            }

        </div>
    )
}

export default Card