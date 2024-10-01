import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import PixelArt from "@/components/PixelArt";

export default function Home() {
    return (
        <main className="w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-900 text-slate-900">
            <Nav />

            <Hero />

            <div className="w-screen h-[calc(100vh-5rem)]"></div>

            <div className="w-screen h-[calc(100vh-5rem)]"></div>
        </main>
    );
}
