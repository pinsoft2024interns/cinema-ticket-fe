import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Hall, Show } from '../../type'
import './Showing.scss';

const Showing = ({ id, showtime, ticketPrice }: Show) => {

  const [hall, setHall] = useState<Hall>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hall/showing/${id}`);


        if (response.ok) {
          const data: Hall = await response.json();
          setHall(data);

        } else {
          const errorText = await response.text();
          setError(`Salon bulunamadi: ${errorText}`);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Salon alinirken hata: ${error.message}`);
        } else {
          setError('Bilinmeyen bir hata oluştu.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShowings();
  }, [showtime,id,ticketPrice]);

  const formattedShowDate = new Date(showtime.toString()).toLocaleDateString('en-CA');

  const formattedShowtime = new Date(showtime.toString()).toLocaleTimeString('en-GB');

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>


  return (
    <div className='showing-container'>
      <h1>Salon Numarası : {hall!.name}</h1>
      <h1>Ekran Türü: {hall!.screenType}</h1>
      <h1>Gösterim Tarihi: {formattedShowDate}</h1>
      <h1>Gösterim Saati: {formattedShowtime} </h1>
      <h1>Bilet Ücreti: {ticketPrice}</h1>
      <h1>Salon Kapasite: {hall!.capacity}</h1>
      <Link href={`/reservation/${id}`}>
        <span className="reservation-link">Rezervasyon Yap</span>
      </Link>
    </div>
  )
}

export default Showing