import ImageCompleted from "../public/succes.png"
import Image from "next/image";

export default function CollectionIndicator () {
    
    return (
        <>
            <div className="flex justify-around  h-24 w-24 outline-1 outline-gray-300 rounded-xl m-2">
                <Image
                    className="self-center"
                    src={ImageCompleted}
                    alt="Icone complet"
                    width={80}
                />
            </div>
        </>
    )
}