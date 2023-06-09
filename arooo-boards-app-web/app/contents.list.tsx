"use client"
import { ShownContent } from "./type.config/custom-type";

export default function ContentsList(props: ContentListProps) {
    
    /* 좋아요 버튼 */
    const addLikesById = async (id: string) => {
        const addLikesURL: string = props.contentsURL + `/${id}/like`;
        try {
            await fetch(addLikesURL, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
            });
            props.getContents();
        } catch {
            console.error('Error');
        }
    }
    /* <END> 좋아요 버튼 */


    return (
        <div
            id="contentsList"
            className="border-y-[1.5px] border-black h-[600px]"
        >
            <div className="mt-[4px] h-[592px] overflow-y-scroll">
            {props.contents.map((content) => (
                <div
                    key={content.id}
                    className="border-[1.5px] border-gray-300 rounded-xl px-[60px] py-[15px] mx-[20px] my-[10px]
                    flex justify-between"
                >
                    <a
                        href={`/details/${content.id}`}
                        className="hover:underline font-bold"
                        >
                        {content.title}
                    </a>
                    <button
                        onClick={() => {addLikesById(content.id)}}
                        className="flex justify-between w-[55px] h-[26px] px-[5px] py-[1px] rounded-md
                        text-white bg-black"
                        >❤︎ <span className="text-sm my-auto font-bold">{content.likes}</span><span></span>
                    </button>
                </div>
            ))}
            </div>
        </div>
    )
}

type GetContents = () => void;

interface ContentListProps {
    contents: ShownContent[],
    contentsURL: string,
    getContents: GetContents
}
