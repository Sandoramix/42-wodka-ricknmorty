import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { GetStaticPaths } from 'next'
import { CharacterDto } from '../types/api';
import Image from 'next/image';

export default function CharacterPage({ character }: InferGetStaticPropsType<typeof getStaticProps>) {

	if (!character) {
		return <div className='w-full h-full flex justify-center items-center text-xl text-red-500'>
			Character not found
		</div>
	}

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className="rounded-md bg-zinc-800 shadow-lg p-2 max-w-screen-sm w-full">
				<div className="px-2 leading-none">
					<Image quality={100} placeholder={`empty`} alt={character.name} src={character.image} width="0" height="0" sizes="100vw" className="max-w-screen-xl w-full rounded-md shadow-2xl aspect-square -translate-y-12 border-4 border-gray-950"></Image>

					<div className="flex-col text-gray-300 -translate-y-6">

						<h2 className="text-xl sm:text-3xl font-bold">{character.name}</h2>
						<div className="text-base sm:text-xl flex justify-between px-6">
							<span className="font-bold">{character.gender} - <span className={`${character.status == "Alive" ? `text-emerald-400` : character.status == 'unknown' ? `text-gray-400` : `text-red-400`}`}>{character.status}</span></span>
						</div>
						{
							character.type &&
							<div className="w-fit border border-cyan-500 text-gray-400 rounded-md px-4 py-2 m-2 select-none">Type: {character.type}</div>
						}
						<div className="w-fit border border-cyan-500 text-gray-400 rounded-md px-4 py-2 m-2 select-none">Origin: {character.origin.name}</div>
						<div className="w-fit border border-cyan-500 text-gray-400 rounded-md px-4 py-2 m-2 select-none">Location: {character.location.name}</div>
					</div>
					<div className="text-xs flex flex-row-reverse">
						<div className="w-fit border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 select-none whitespace-nowrap">Created: {new Date(character.created).toISOString().substring(0, 10)}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const apiReq = await fetch("https://rickandmortyapi.com/api/character");
	const apiData = await apiReq.json();
	if (!apiReq.ok || !apiData || !apiData.info) {
		return { paths: [], fallback: false }
	};
	const ids = Array(apiData.info.count).fill(0).map((val, idx) => (idx + 1).toString());
	return {
		paths: ids.map(id => ({ params: { id } })),
		fallback: false
	};
}

export const getStaticProps: GetStaticProps<{ character: CharacterDto | null }> = async (ctx) => {
	console.log({ ctx });
	let character: CharacterDto | null = null;

	if (!ctx.params) {
		return { props: { character } };
	}
	const { id } = ctx.params;
	const req = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
	const data = await req.json();
	if (!data) {
		return { props: { character } }
	}
	character = data;

	return {
		props: {
			character
		}
	}
}