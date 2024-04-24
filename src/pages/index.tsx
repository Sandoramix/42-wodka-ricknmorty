import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'
import { useState } from 'react'


export default function Home() {
  const [results, setResults] = useState<any[]>([]);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [],
    queryFn: () => {
      axios.get('https://rickandmortyapi.com/api/character')
        .then((res) => setResults(res.data.results));
    },
  })

  return (
    <div>
      {results.map((r, idx) => (<div key={idx}>{r.name}</div>))}
    </div>
  );
}
