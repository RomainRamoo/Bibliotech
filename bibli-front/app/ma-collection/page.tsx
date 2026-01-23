'use client'

import Link from "next/link";
import Image from "next/image";
import ImageBookmark from "../../public/marque-page.png";
import ImageUser from "../../public/utilisateur.png";
import ImageStats from "../../public/etude-de-marche.png"
import ImageFiltre from "../../public/filtre.png"
import ProtectedRoute from "@/components/ProtectedRoute";
import Recommandation from "@/components/UserRecommendation";
import BookCard from "@/components/BookCard";
import IBook from "@/@types/Series";
import { useEffect, useState } from "react";
import { getAllSeries } from "../services/book.service";
import Filters from "@/components/FilterCard";


export default function MaCollectionPage () {
    const [bookData, setBookData] = useState<IBook[]>([]);
    const [errorBook, setErrorBook] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() =>{
        const fetchSeries = async () => {
            try {
                const data = await getAllSeries();
                setBookData(data);
            } catch (error: any) {
                setErrorBook(error.message || 'Impossible de récupérer les séries');
            }

        }
        fetchSeries();
    }, [])



    return(
        <>
            <ProtectedRoute>
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
                <div className="w-20 h-20 rounded-full outline-1 outline-gray-500 hover:outline-orange-400 flex items-center justify-center">
                    <Link href={'/wishlist'}>
                        <Image
                            src= {ImageUser}
                            alt="Icone utilisateur"
                            loading="eager"
                            width={80}
                        />
                    </Link>
                </div>
                <div className="w-20 h-20 rounded-full outline-1 outline-gray-500 hover:outline-orange-400 flex items-center justify-center">
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
                    <button 
                        className="btn h-8 w-20 rounded-xl outline-1 outline-gray-500 "
                        onClick={() => setShowFilters(prev => !prev)}>
                        <Image
                            src= {ImageFiltre}
                            alt="Icône filtre"
                            width={80}
                            height={10}
                        />
                    </button>
                </div>
            </div>
            {showFilters === true ? 
                <Filters onClose={() => setShowFilters(false)}/> : 
                <BookCard books={bookData}/>  }
            
            <Recommandation />
            </ProtectedRoute>
        </>
    )
}