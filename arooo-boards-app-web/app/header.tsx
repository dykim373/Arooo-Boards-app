export default function Header() {
    return (
        <header className="flex mt-[5px] mb-[15px]">
            <a href="/" className="flex">
                <img src="/Arooo-boards-png.png" className="h-[100px]"/>
                <div className="flex flex-col justify-end">
                    <p className="text-lg font-semibold ml-[7px]">자기만의방</p>
                    <p className="text-5xl font-semibold pr-[20px] mb-[10px]">Arooo</p>
                </div>
            </a>
        </header>
    )
}
