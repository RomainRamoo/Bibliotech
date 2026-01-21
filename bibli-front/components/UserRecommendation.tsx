import Image from "next/image";
import ImageAkira from "../public/akira.webp"
import ImageCancel from "../public/signe-de-la-croix.png"

export default function Recommandation () {


    return (
        <>
            <div className="m-2">
                <div className="flex justify-between outline-1 outline-green-300 rounded-xl">
                    <Image 
                        className="m-3"
                        src={ImageAkira}
                        alt="Akira"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">Araycrust recommande Akira</h3>
                    <button className="self-start">
                        <Image
                            className="m-1"
                            src={ImageCancel}
                            alt="croix"
                            width={20}
                        />
                    </button>
                </div>
            </div>
        
        
        </>
    )    
}