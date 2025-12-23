import Link from "next/link";
import Image from "next/image";
import ImageBookmark from "../../public/marque-page.png";
import ImageUser from "../../public/utilisateur.png";
import ImageStats from "../../public/etude-de-marche.png"
import ImageFiltre from "../../public/filtre.png"
import Image20ThCenturyBoys from "../../public/century boy.webp"
import ImageCompleted from "../../public/succes.png"
import ImageAkira from "../../public/akira.webp"
import ImageCancel from "../../public/signe-de-la-croix.png"


export default function Series () {

    return(
        <>
            <div className="text-center text-3xl m-5"><h1>Ma collection</h1></div>
            <div className="flex justify-around mt-5">
                <div className="w-20 h-20 rounded-full outline-1 outline-gray-500 hover:outline-orange-400 flex items-center justify-center p-2">
                    <Link href={'/wishlist'}>
                        <Image
                            src= {ImageBookmark}
                            alt="Icone wishlist"
                            width={70}
                        />
                    </Link>
                </div>
                <div className="w-20 h-20 rounded-full outline-1 outline-gray-500 flex items-center justify-center">
                    <Link href={'/wishlist'}>
                        <Image
                            src= {ImageUser}
                            alt="Icone utilisateur"
                            width={80}
                        />
                    </Link>
                </div>
                <div className="w-20 h-20 rounded-full outline-1 outline-gray-500 flex items-center justify-center">
                    <Link href={'/statistiques'}>
                        <Image
                            src= {ImageStats}
                            alt="Icone statistique"
                            width={55}
                            
                        />
                    </Link>
                </div>
            </div>
            <div className="flex justify-between items-stretch m-5">
                <div className="self-center"><h2>Séries : 200 - Albums : 1000</h2></div>
                <div>
                    <button className="btn h-8 w-20 rounded-xl outline-1 outline-gray-500">
                        <Image
                            src= {ImageFiltre}
                            alt="Icône filtre"
                            width={80}
                            height={10}
                        />
                    </button>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2 ml-2">
                <div className="flex justify-start outline-1 outline-gray-300 rounded-xl">
                    <Image 
                        className="m-3"
                        src={Image20ThCenturyBoys}
                        alt="20th Century boys"
                        width={60}
                    />
                    <h3 className="self-center m-5 text-xl">20th Century boys</h3>
                </div>
                <div className="flex">
                    <div className="outline-1 outline-gray-300 rounded-xl self-center p-3">
                        <Image
                            src={ImageCompleted}
                            alt="Icone complet"
                            width={80}
                        />
                    </div>
                </div>
            </div>
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