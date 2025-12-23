import Image from "next/image";
import ImageBack from "../../../public/fleche-droite.png";
import ImageAkaneBanashi12 from "../../../public/akane-banashi_12.webp";


export default function Serie () {

    return (

        <>
            <div className="flex justify-end mr-3">
                <Image
                    src={ImageBack}
                    alt="Flêche de retour"
                    width={100}
                />
                <h1 className="text-2xl self-center ml-1">Ma collection</h1>
            </div>
            <div className="flex justify-between m-5">
                <h2 className="text-3xl">Akane-Banashi</h2>
                <div className="text-2xl self-center">10/12</div>
            </div>
            <div className="flex justify-between m-4">
                <progress className="progress progress-warning w-56 self-center" value="70" max="100"></progress>
                <div className="flex">
                    <h3 className="text-xl m-3">Tous lu</h3>
                    <input type="checkbox" defaultChecked className="toggle self-center" />
                </div>
            </div>
        </>
    )
}