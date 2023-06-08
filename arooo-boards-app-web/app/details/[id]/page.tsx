"use client"
import { Content } from "@/app/type.config/custom-type";
import { useEffect, useState } from "react"

export default function Page({params}: {params: DetailPageParam}) {
    
    /* 상세 콘텐츠 불러오기 */
    const contentsURL: string = "http://localhost:3030/library/content";
    const [details, setDetails] = useState<Content>(defaultContent);
    useEffect(() => {getDetails()}, []);

    const getDetails = async () => {
        const detailsURL: string = contentsURL + `/${params.id}`;
        try {
            const response = await fetch(detailsURL, {
                method: "GET",
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data: Content = await response.json();
            setDetails(data);
        } catch {
            console.error("Error");
        }
    }
    /* <END> 상세 콘텐츠 불러오기 */


    /* 좋아요 버튼 */
    const addLikesById = async (id: string) => {
        const addLikesURL: string = contentsURL + `/${id}/like`;
        try {
            await fetch(addLikesURL, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
            });
            getDetails();
        } catch {
            console.error('Error');
        }
    }
    /* <END> 좋아요 버튼 */


    return (
        <div>
            <div
                id="detailsBox"
                className=""
                >
                    <div
                        id="titleBox"
                        className="flex"
                    >
                        <p>{details.title}</p>
                        <button
                            onClick={() => {addLikesById(details.id)}}
                            className="border border-black px-[3px]"
                            >❤︎ <span className="text-sm">{details.likes}</span>
                        </button>
                    </div>
                    <div
                        id="contentBox"
                        className="whitespace-pre"
                    >
                        {details.content}
                    </div>
            </div>
        </div>
    )
}

interface DetailPageParam {
    id: string;
}

const defaultContent: Content = {
    id: "",
    title: "",
    likes: 0,
    content: ""
}
