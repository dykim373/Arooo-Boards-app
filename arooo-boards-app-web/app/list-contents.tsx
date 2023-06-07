"use client"
import { FormEvent, useEffect, useState } from "react";
import { ShownContent } from "./type.config/custom-type";

export default function ListContents(
    props: {showForm: boolean, limit: number}
) {
    /* Contents 받아오기 */
    const contentsURL: string = "http://localhost:3030/library/content";
    const [contents, setContents] = useState<ShownContent[]>([]);
    const [skip, setSkip] = useState('');
    const [limit, setLimit] = useState(`${props.limit}`);
    useEffect(() => {getContents(skip, limit)},[]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getContents(skip, limit);
    }
    const getContents = async (skip: string, limit: string) => {
        const queryRequest: string = `?skip=${skip}&limit=${limit}`;
        const cuttingContentsURL: string = contentsURL + queryRequest;
        try {
            const response = await fetch(cuttingContentsURL, {
                method: "GET",
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data: ShownContent[] = await response.json();
            setContents(data);
        } catch {
            console.error('Error');
        }
    }
    /* <END> Contents 받아오기 */


    /* 좋아요 버튼 */
    const addLikesById = async (id: string) => {
        const addLikesURL: string = contentsURL + `/${id}/like`
        try {
            const response = await fetch(addLikesURL, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data: {likes: number} = await response.json();
            getContents(skip, limit);
        } catch {
            console.error('Error');
        }
    }
    /* <END> 좋아요 버튼 */


    return (
        <div id="contentsBox">
            <form onSubmit={onSubmit} className={props.showForm?'':'hidden'}>
                <input
                    id="skip"
                    type="text"
                    value={skip}
                    onChange={(event) => setSkip(event.target.value)}
                    placeholder="Number"
                    className="border border-gray-700"
                />
                <input
                    id="limit"
                    type="text"
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                    placeholder="Number"
                    className="border border-gray-700"
                />
                <button>Click</button>
            </form>
            <div className="bg-red-100">
                {contents.map((content) => (
                    <div
                        key={content.id}
                        className="flex"
                    >
                        <p>{content.title}</p>
                        <button 
                            onClick={() => {addLikesById(content.id)}}
                            className="border border-black px-[3px]"
                            >❤︎ <span className="text-sm">{content.likes}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}