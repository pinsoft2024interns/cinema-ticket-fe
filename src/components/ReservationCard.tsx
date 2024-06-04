import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Show, Payment, Reservation } from '../../type';
import '../components/ReservationCard.scss'

const ReservationCard = ({ reservationId, seatInfo, numberOfPeople, isCancel }: Reservation) => {
  const [show, setShow] = useState<Show | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null)

  let formattedPaymentDate;
  let formattedPaymentTime;
  let formattedShowDate;
  let formattedShowTime;

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservation/shwoing/${reservationId}`);
      const response1 = await fetch(`http://localhost:8080/pay/${reservationId}`);
  
      if (response.ok) {
        const data: Show = await response.json();
        setShow(data);
      }
      if (response1.ok) {
        const data1: Payment | null = await response1.json();
        setPayment(data1);
      }
    }
     catch (error) {
      console.log(error);
      
    } 
  }

  useEffect(() => {

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (show !== null) {

    formattedShowDate = new Date(show.showtime!.toString()).toLocaleDateString('en-CA');

    formattedShowTime = new Date(show.showtime!.toString()).toLocaleTimeString('en-GB');

  }

  if (payment !== null) {
    formattedPaymentDate = new Date(payment.paymentDate!.toString()).toLocaleDateString('en-CA')
    formattedPaymentTime = new Date(payment.paymentDate!.toString()).toLocaleTimeString('en-GB')
  }

  return (
    <div className={'reservation-card-container'}>
      <div className={'reservation-info'}>
        <strong>Koltuk Numaraları:</strong> {seatInfo}
      </div>
      <div className={'reservation-info'}>
        <strong>Kişi Sayısı:</strong> {numberOfPeople}
      </div>
      <div className={'reservation-info'}>
        <strong>Rezervasyon Durumu:</strong> {isCancel ? 'İptal Talebinin Onaylanması Bekleniyor' : 'Aktif'}
      </div>
      <div className={'reservation-info'}>
        <strong>Rezervasyon Tarihi:</strong> {formattedShowDate}
      </div>
      <div className={'reservation-info'}>
        <strong>Rezervasyon Saati:</strong> {formattedShowTime}
      </div>
      <div className={'reservation-info'}>
        <strong>Bilet (Adet) Fiyatı:</strong> {show?.ticketPrice}
      </div>

      {
        payment !== null &&

        <>
        <div className={'reservation-info'}>
          <strong>Ödeme Durumu:</strong> {payment.amount + " TL Ödendi" }
        </div>
        <div className={'reservation-info'}>
          <strong>Ödeme Tarihi:</strong> {formattedPaymentDate}
        </div>
        <div className={'reservation-info'}>
          <strong>Ödeme Saati:</strong> {formattedPaymentTime}
        </div>
      </>
      }

       
       

      {
        isCancel ? true :
          <div className={'reservation-links'}>
            <Link href={`/card-info/${reservationId}`}>
              <span className={'reservation-link'}>Ödeme Yöntemi Seç</span>
            </Link>
            <Link href={`/cancel/${reservationId}`}>
              <span className={'reservation-link'}>İptal Et</span>
            </Link>
          </div>
      }
    </div>
  );
};

export default ReservationCard;
