"use client"
import { FormEvent, useEffect, useState } from "react";
import { ShownContent } from "./type.config/custom-type";
import ContentsList from "./contents.list";
import ContentsLoading from "./contents.loading";

export default function ContentsBox() {

    /* Contents 받아오기 */
    const contentsURL: string = "http://localhost:3030/library/content";
    const loadingDelay: number = 300;
    const [contents, setContents] = useState<ShownContent[]>([]);
    const [skip, setSkip] = useState<string>('');
    const [limit, setLimit] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {loadContents()},[]);

    const reloadContents = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loadContents();
    }
    const loadContents = async () => {
        setLoading(true);
        await getContents();
        setTimeout(() => setLoading(false), loadingDelay);
    }
    const getContents = async () => {
        const [managedSkip, managedLimit] = manageSkipLimit(skip, limit);
        const queryRequest: string = `?skip=${managedSkip}&limit=${managedLimit}`;
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


    return (
        <div id="contentsBox">
            <form
                id="reloadForm"
                onSubmit={reloadContents}
                className="border-b-[3px] border-gray-200 flex justify-end"
            >
                <input
                    id="skip"
                    type="text"
                    value={skip}
                    onChange={(event) => setSkip(event.target.value)}
                    placeholder="Skip"
                    className="border border-gray-700 rounded-md text-sm
                    px-[10px] py-[3px] w-[60px] mr-[5px] mb-[3px]"
                />
                <input
                    id="limit"
                    type="text"
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                    placeholder="Limit"
                    className="border border-gray-700 rounded-md text-sm
                    px-[10px] py-[3px] w-[60px] mr-[5px] mb-[3px]"
                />
                <button
                    className="bg-black rounded-md text-sm text-center text-white font-bold
                    py-[3px] w-[60px] mr-[5px] mb-[3px]"
                >Reload</button>
            </form>


            <div className={loading?'hidden':''}>
                <ContentsList
                    contents = {contents}
                    contentsURL = {contentsURL}
                    getContents = {getContents}
                />
            </div>
            <div className={loading?'':'hidden'}>
                <ContentsLoading/>
            </div>
        </div>
    )
}

const manageSkipLimit = (getSkip: string, getLimit: string) => {
    let numSkip: number = Number(getSkip);
    let numLimit: number = Number(getLimit);

    if (Number.isNaN(numSkip) || numSkip < 0){
        numSkip = 0;
    } else {
        numSkip = Math.floor(numSkip);
    }

    if (Number.isNaN(numLimit) || numLimit <= 0){
        numLimit = 9999;
    } else {
        numLimit = Math.floor(numLimit);
    }

    return [numSkip, numLimit];
}
