import PixelArt from "./PixelArt";

const Nav = () => (
    <nav className="bg-primary font-[Dinkie] w-screen h-20 sticky top-0 flex flex-row border-b-2 border-slate-800 justify-between items-center z-50">
        <PixelArt imageSrc={"/eye.png"} className="h-full" />

        <a href="/" className="px-1 text-primary bg-slate-900 hidden sm:block">
            LUISA GROUP
        </a>

        <div className="flex flex-row items-center pr-2 [&>*]:mx-1 [&>*]:px-1 md:[&>*]:mx-3 md:[&>*]:px-2">
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
);

export default Nav;
