import Image from "next/image";

import eyeImg from "./assets/eye.png";
import Hero from "@/components/Hero";
import PixelArt from "@/components/PixelArt";

export default function Home() {
    return (
        <main className="w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-900 text-slate-900">
            <nav className="bg-primary font-[Dinkie] w-screen h-20 sticky top-0 flex flex-row justify-between items-center z-50">
                <PixelArt imageSrc={"/eye.png"} className="h-full" />

                <a href="/" className="px-1 text-primary bg-slate-900">
                    LUISA GROUP
                </a>

                <div className="flex flex-row items-center pr-2 [&>*]:mx-3 [&>*]:px-2">
                    <a className="hover:text-primary hover:bg-red-300 text-red-800 cursor-pointer">
                        Doc
                    </a>

                    <a className="hover:text-primary hover:bg-green-400 text-green-800 cursor-pointer">
                        Paper
                    </a>

                    <a className="hover:text-primary hover:bg-blue-300 text-blue-800 cursor-pointer">
                        About
                    </a>
                </div>
            </nav>

            <Hero />

            <div className="w-screen h-[calc(100vh-5rem)]"></div>
        </main>
    );
}
