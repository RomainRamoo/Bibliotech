import Link from "next/link";

export default function Home () {

    return (
        <>
            <div className="flex justify-around">
                <Link href={'/connexion'}>
                    <button className="btn">Connexion</button>
                </Link>
                <Link href={'/inscription'}>
                    <button className="btn">Inscription</button>
                </Link>
                <Link href={'/contacts'}>
                    <button className="btn">Contacts</button>
                </Link>
            </div>
        </>
    )
}