"use client"
import CardAdd from '@/components/CardAdd';
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {

    const { id } = useParams<{ id: string }>();

    const userId = Number(id);

    return (
        <CardAdd userId={userId} />
    )
}

export default Page