"use client"

export default function ContentsLoading() {
    
    return (
        <div
            id="contentsLoading"
            className="flex flex-col justify-center border-y-[1.5px] border-black h-[600px]"
        >
            <div
                className="w-[70px] h-[70px] mx-auto 
                border-[5px] border-black border-opacity-90 border-b-transparent border-l-transparent rounded-full
                loading-animation"
            />
            <p className="text-center font-semibold mt-[10px] ml-[3px]">Loading...</p>
        </div>
    )
}
