import { CharacterDto } from '@/types/api';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'
import Image from 'next/image';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react'


export default function Home() {
  const [results, setResults] = useState<CharacterDto[]>([]);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["character"],
    queryFn: async () => {
      const res = await axios.get('https://rickandmortyapi.com/api/character')
      console.log({ res });

      return res.data;
    },
  })
  useEffect(() => {
    console.log(results)
    setResults(data?.results ?? [])
  }, [data]);

  if (isFetching || isPending) {
    return <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>
  }

  return (
    <section className={`grid grid-flow-row grid-cols-4 gap-2 items-start grow`}>
      {results.map((r, idx) => (<CharacterCard character={r} key={r.id}></CharacterCard>))}
    </section>
  );
}

export const CharacterCard: FunctionComponent<PropsWithChildren<{ character: CharacterDto }>> = ({ character }) => {

  return (<div className={`w-60 aspect-[3/4] ${character.status == "Alive" ? `bg-emerald-900` : character.status == 'unknown' ? `bg-gray-700` : `bg-red-900`} flex flex-col rounded-sm overflow-hidden`}>
    <Image alt={character.name} src={character.image} width={240} height={25}></Image>
    <div className='font-mono text-center font-semibold'>{character.name}</div>
    <div className='italic px-2 py-1'>
      <p className='font-serif text-gray-300'>{character.species} - {character.gender}</p>
      <p>Status: {character.status}</p>
    </div>
  </div>)
}