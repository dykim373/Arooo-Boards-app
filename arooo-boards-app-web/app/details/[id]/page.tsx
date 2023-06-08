"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import ShowContent from "./show-content";
import ContentsLoading from "@/app/contents.loading";

export default function Page({params}: {params: DetailPageParam}) {

    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    return (
        <div id="detailsBox">
            <div className="border-b-[3px] border-gray-200 flex justify-end">
                <button
                    onClick={() => {router.push('/')}}
                    className="bg-black rounded-md text-sm text-center text-white font-bold
                    py-[3px] w-[60px] mr-[5px] mb-[3px]"
                >Back</button>
            </div>


            <div className={loading?'hidden':''}>
                <ShowContent
                    id = {params.id}
                    setLoading = {setLoading}
                />
            </div>
            <div className={loading?'':'hidden'}>
                <ContentsLoading/>
            </div>
        </div>
    )
}

interface DetailPageParam {
    id: string;
}
