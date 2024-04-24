import Link from "next/link"

export const Footer = () => {
	return (
		<footer className="h-16 w-full px-3 py-1">
			<h5>Made by <Link href={"https://github.com/sandoramix"} target="_blank">@odudniak</Link></h5>
		</footer>
	)
}