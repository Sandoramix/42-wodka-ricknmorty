import { PropsWithChildren } from "react"
import { Header } from "./Header"
import { Inter } from "next/font/google";
import { Footer } from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const Layout = (props: PropsWithChildren) => {
	return (
		<main
			className={`flex min-h-perfect flex-col items-center justify-between ${inter.className}`}
		>
			<Header></Header>
			{props.children}
			<Footer></Footer>
		</main>
	)
}