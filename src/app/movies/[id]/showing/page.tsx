'use client';
import ShowingList from '@/components/ShowingList'
import { useParams} from 'next/navigation';


const Page = () => {

    const { id  } = useParams<{ id: string }>();

    const movieId  = Number(id);    

  return (
    <ShowingList movieId={movieId}/>
  )
}

export default Page