'use client'
import IBook from "@/@types/Series";
import { useEffect, useState } from "react";
import AddBook from "@/components/AddBook";
import { createBook, searchSerie, searchSerieWithLastVolumeByTitle } from "../services/book.service";
import IVolume from "@/@types/Volume";
import FormVolumes, { searchSerieWithLastVolume } from "@/components/FormVolumes";
import { createVolume } from "../services/volume.service";


interface IBookProps {
    onUpdate: () => void;
}


export default function Admin ({onUpdate}: IBookProps) {
    const [searchTitle, setSearchTitle] = useState("");
    const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
    
    const [bookData, setBookData] = useState<IBook | null>(null);
    const [volumeData, setVolumeData] = useState<IVolume | null>(null);
    const [serieWithVolume, setSerieWithVolume] = useState<searchSerieWithLastVolume | null>(null);
    
    const [activeSection, setActiveSection] = useState("Livres");
    const [activeSubsection, setActiveSubsection] = useState("Volumes");
    
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    

    // Debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearchTitle(searchTitle);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchTitle]);

    //Recherche Principale
    useEffect(() => {
        if (!debouncedSearchTitle || debouncedSearchTitle.trim().length < 3) {
            setBookData(null);
            setSerieWithVolume(null);
            return;
        }

        const fetchData = async () => {
            setIsSearching(true);
            setHasSearched(true);


            try {
                if (activeSubsection === 'Volumes') {
                    const serie = 
                        await searchSerieWithLastVolumeByTitle(debouncedSearchTitle);
                    setSerieWithVolume(serie);
                    setBookData(null);

                } else {
                    const book = await searchSerie(debouncedSearchTitle);
                    setBookData(book);
                    setSerieWithVolume(null);
                }
            } catch {
                setBookData(null);
                setSerieWithVolume(null);
            } finally {
                setIsSearching(false);
            }
            
        };

        fetchData();
    }, [debouncedSearchTitle, activeSubsection]);

    const handleCreateBook = async (data: {
        title: string;
        genre: string;
        format: string;
        author: string;
        book_cover?: string;
        lastVolumeNumber: number;
    }) => {
        try {
            await createBook(data);

            setSearchTitle("");
            setBookData(null);
            onUpdate();
        } catch (error) {
            throw error;
        }
    }

    const addVolume = async (data: {
        serieId: number;
        volumeNumber: number;
        publication_date?: string;
        price?: number;
        image_url?: string;
    }) => {
        try {
            const payload = {
                volume_number: data.volumeNumber,
                price: data.price,
                image_url: data.image_url,
                publication_date: data.publication_date,
                signed: false,
                collector: false,
                is_read: false,
                is_possess: false,
            };

    await createVolume(payload, data.serieId);

        } catch (error) {
            console.error(error);
            throw error;
            
        }
    };

    

    return (
        <>
            <div className="min-h-screen">
                <div><h1 className="text-center text-3xl m-5">La réserve</h1></div>
                <div className="flex justify-around mt-5">
                    <button
                        type="button"
                        className={`btn w-30 h-8 text-xl outline-2 outline-gray-100 ${activeSection === 'Livres' ? 'outline-orange-300' : ''}`}
                        onClick={() => setActiveSection('Livres')}
                    >
                        <h2>Livres</h2>
                    </button>
                    <button
                        type="button"
                        className={`btn w-30 h-8 text-xl outline-2 outline-gray-100 ${activeSection === 'Séries' ? 'outline-orange-300' : ''}`}
                        onClick={() => setActiveSection('Séries')}
                    >
                        <h2>Séries</h2>
                    </button>
                    <button
                        type="button"
                        className={`btn w-30 h-8 text-xl outline-2 outline-gray-100 ${activeSection === 'Films' ? 'outline-orange-300' : ''}`}
                        onClick={() => setActiveSection('Films')}
                    >
                        <h2>Films</h2>
                    </button>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="flex justify-around">
                        <button
                        type="button"
                        className={`btn ${activeSubsection === 'Ajouter' ? 'bg-orange-300' : ''}`}
                        onClick={() => setActiveSubsection('Ajouter')}
                    >
                        <h2>Ajouter</h2>
                    </button>
                    <button
                        type="button"
                        className={`btn ${activeSubsection === 'Volumes' ? 'bg-orange-300' : ''}`}
                        onClick={() => setActiveSubsection('Volumes')}
                    >
                        <h2>Volumes</h2>
                    </button>
                    <button
                        type="button"
                        className={`btn ${activeSubsection === 'Modifier' ? 'bg-orange-300' : ''}`}
                        onClick={() => setActiveSubsection('Modifier')}
                    >
                        <h2>Modifier</h2>
                    </button>

                    </div>
                    
                    <div className="mt-6">
                        
                        {(activeSubsection === 'Ajouter') && (
                            <AddBook
                                searchTitle={searchTitle}
                                onSearchChange={setSearchTitle}
                                bookData={bookData}
                                volumeData={volumeData}
                                onSave={handleCreateBook}
                                isSearching={isSearching}
                                hasSearched={hasSearched}
                        />)}
                        {(activeSubsection === 'Volumes') && (
                            <FormVolumes
                                searchTitle={searchTitle}
                                onSearchChange={setSearchTitle}
                                searchSerie={serieWithVolume}
                                onSave={addVolume}
                                isSearching={isSearching}
                                hasSearched={hasSearched}
                        />)}
                        

                    </div>

                    
                    
                </div>
            </div>
            
            
        </>
    )
}
