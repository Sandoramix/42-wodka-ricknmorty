import Link from "next/link"

export const Footer = () => {
	return (
		<footer className="h-16 w-full px-3 py-1 flex items-center shrink-0">
			<h5 className="font-serif">Made by <Link href={"https://github.com/sandoramix"} target="_blank" className="font-mono decoration-transparent underline-offset-4 underline hover:decoration-cyan-500 duration-300">@odudniak</Link></h5>
		</footer>
	)
}