import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useRouter } from 'next/router';
export const Header = () => {
	const router = useRouter();

	return (
		<header className="h-16 w-full flex gap-2 px-3 py-1 items-center shrink-0 justify-between">
			<h1 className="font-mono text-cyan-400 animate-pulse">
				Rick and morty api showcase.
			</h1>
			{router.route != '/' &&
				<Link href={"/"} className="font-mono"><FaHome className="w-12 h-12 text-cyan-800 hover:text-cyan-600 hover:cursor-pointer" /></Link>
			}
		</header>
	);
}
