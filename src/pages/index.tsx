import { CharacterDto } from '@/types/api';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'
import Image from 'next/image';
import { FunctionComponent, PropsWithChildren, memo, useEffect, useMemo, useState } from 'react'


export default function Home() {
  const [results, setResults] = useState<CharacterDto[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: async (data) => {
      const res = await axios.get(data.pageParam)
      return res.data;
    },
    initialPageParam: `https://rickandmortyapi.com/api/character`,
    maxPages: 42,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.info.next;
    },
  })

  useEffect(() => {
    const newData = data?.pages.at(-1);
    setResults(prev => prev.concat(newData?.results ?? []).filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i))
  }, [data]);

  return (
    <section className={`flex flex-col gap-1 items-start justify-center grow`}>
      {isFetchingNextPage && (<div>
        <div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backdrop-brightness-75 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>)}
      <div className='grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {results.map((r, idx) => (<CharacterCard character={r} key={r.id}></CharacterCard>))}
      </div>
      {!isFetching && (
        <div className='flex justify-center w-full' >
          <button onClick={() => fetchNextPage()} className='px-4 py-2 text-white duration-200 rounded hover:cursor-pointer hover:bg-yellow-500 hover:text-black bg-emerald-600'>Load more</button>
        </div>
      )}
    </section>
  );
}

export const CharacterCard: FunctionComponent<PropsWithChildren<{ character: CharacterDto }>> = ({ character }) => {

  return (<div className={`w-60 aspect-[3/4]flex flex-col rounded-sm overflow-hidden
        ${character.status == "Alive" ? `bg-emerald-900` : character.status == 'unknown' ? `bg-gray-700` : `bg-red-900`}`}>
    <Image alt={character.name} src={character.image} width="0" height="0" sizes="100vw" className="w-full h-auto"></Image>
    <div className='h-20'>
      <div className='font-mono text-sm font-semibold text-center text-nowrap'>{character.name}</div>
      <div className='px-2 py-1 text-xs italic '>
        <p className='font-serif text-gray-300'>{character.species} - {character.gender}</p>
        <p>Status: {character.status}</p>
      </div>
    </div>
  </div>)
}