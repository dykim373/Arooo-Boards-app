"use client"
import { Content } from "@/app/type.config/custom-type";
import { useEffect, useState } from "react"

export default function ShowContent(props : ShowContentProps) {

    /* 상세 콘텐츠 불러오기 */
    const contentsURL: string = "http://localhost:3030/library/content";
    const loadingDelay: number = 15;
    const [details, setDetails] = useState<Content>(defaultContent);

    useEffect(() => {loadContent()}, []);

    const loadContent = async () => {
        props.setLoading(true);
        await getDetails();
        setTimeout(() => props.setLoading(false), loadingDelay);
    }
    const getDetails = async () => {
        const detailsURL: string = contentsURL + `/${props.id}`;
        try {
            const response = await fetch(detailsURL, {
                method: "GET",
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data: Content = await response.json();
            setDetails(data);
            console.log(data)
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
        <div
            id="showContent"
            className="border-y-[1.5px] border-black h-[600px]"
        >
            <div
                className="h-[560px] border-[1.5px] border-black ring-[2px] ring-gray-200 rounded-3xl
                mx-[10px] my-[20px]"
            >
                <div
                    className="flex justify-between mx-[50px] my-[16px]"
                >
                    <p className="font-bold text-xl">{details.title}</p>
                    <button
                        onClick={() => {addLikesById(details.id)}}
                        className="flex justify-between w-[55px] h-[26px] px-[5px] py-[1px] rounded-md
                        text-white bg-black"
                        >❤︎ <span className="text-sm my-auto font-bold">{details.likes}</span><span></span>
                    </button>
                </div>
                <hr className="border-[1px] border-black"/>
                <div
                    className="h-[460px] mx-[55px] my-[20px] overflow-y-scroll"
                >
                    <p
                        style={{fontSize: '1rem', lineHeight: '2rem'}}
                        className="text-base text-gray-700 whitespace-pre">{details.content}</p>
                </div>
            </div>
        </div>
    )
}

type SetLoading = (arg: boolean) => void;

interface ShowContentProps {
    id:string,
    setLoading: SetLoading
}

const defaultContent: Content = {
    id: "",
    title: "",
    likes: 0,
    content: ""
}
