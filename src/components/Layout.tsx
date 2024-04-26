import { PropsWithChildren } from "react"
import { Header } from "./Header"
import { Inter } from "next/font/google";
import { Footer } from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const Layout = (props: PropsWithChildren) => {
	return (
		<main
			className={`flex h-perfect flex-col items-center justify-between ${inter.className} overflow-hidden`}
		>
			<Header></Header>
			<div className="grow flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden w-full p-3">
				{props.children}
			</div>
			<Footer></Footer>
		</main>
	)
}