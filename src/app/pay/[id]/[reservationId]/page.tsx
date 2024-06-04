"use client"
import Pay from '@/components/Pay';
import { useParams } from 'next/navigation';
import React from 'react'


const Page = () => {
    const { id ,reservationId } = useParams<{ id: string ,reservationId:string }>();

    const cardId  = Number(id);

    const reservation = Number(reservationId)

    
  return (
    <Pay cardInfoId={cardId} reservationId={reservation} />
  )
}

export default Page