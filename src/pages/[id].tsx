import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { GetStaticPaths } from 'next'
import { CharacterDto } from '../types/api';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function CharacterPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [character, setCharacter] = useState<CharacterDto | null>(null);

	useEffect(() => {
		if (!router.query.id) {
			return;
		}
		axios.get(`https://rickandmortyapi.com/api/character/${router.query.id}`)
			.then(res => {
				setCharacter(res.data);
				setIsLoading(false);
			})
			.catch(err => {
				setIsLoading(false);
			});
	}, [router.query.id]);

	if (isLoading) {
		return (<div className='backdrop-brightness-75 w-full h-full z-50 flex justify-center items-center'>
			<div
				className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
				role="status">
				<span
					className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
				>Loading...</span>
			</div>
		</div>)
	}

	if (!character) {
		return <div className='w-full h-full flex justify-center items-center text-xl text-red-500'>
			Character not found
		</div>
	}

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className="rounded-md bg-zinc-800 shadow-lg p-2 max-w-[480px] min-w-[200px] w-full">
				<div className="px-2 leading-none">
					<Image quality={100} placeholder={`empty`} alt={character.name} src={character.image} width="0" height="0" sizes="100vw" className="max-w-screen-xl w-full rounded-md shadow-2xl aspect-square -translate-y-6 border-4 border-gray-950"></Image>

					<div className="flex-col text-gray-300 -translate-y-2">

						<h2 className="sm:text-2xl font-bold">{character.name}</h2>
						<div className="text-xs sm:text-base flex justify-between px-6">
							<span className="font-bold">{character.gender} - <span className={`${character.status == "Alive" ? `text-emerald-400` : character.status == 'unknown' ? `text-gray-400` : `text-red-400`}`}>{character.status}</span></span>
						</div>
						{
							character.type &&
							<div className="w-fit border border-cyan-500 text-gray-400 rounded-md px-1 sm:px-4 py-2 sm:py-3 m-1 text-xs sm:text-base select-none">Type: {character.type}</div>
						}
						<div className="w-fit border border-cyan-500 text-gray-400 rounded-md px-1 sm:px-4 py-2 sm:py-3 m-1 select-none text-xs sm:text-base">Origin: {character.origin.name}</div>
						<div className="w-fit border border-cyan-500 text-gray-400 rounded-md px-1 sm:px-4 py-2 sm:py-3 m-1 text-xs sm:text-base">Location: {character.location.name}</div>
					</div>
					<div className="text-xs flex flex-row-reverse">
						<div className="w-fit border border-gray-400 text-gray-400 rounded-md px-1 sm:px-4 py-2 sm:py-3 m-1 text-xs sm:text-base select-none whitespace-nowrap">Created: {new Date(character.created).toISOString().substring(0, 10)}</div>
					</div>
				</div>
			</div>
		</div>
	)
}