"use client"

import CardInfoList from '@/components/CardInfoList';
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const reservationId = Number(id);

  let userId: number;
  let user = (localStorage.getItem('user'))

  
  if (user) {
    userId = Number(JSON.parse(user).id)
    return (


      <CardInfoList reservationId={reservationId} userId={userId} />
    )
  }
  else {
    return <h1>Kullanici Girişi Yapiniz</h1>
  }
}

export default Page