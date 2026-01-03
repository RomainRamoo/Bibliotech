'use client'
import IBook from "@/@types/Series";
import { useEffect, useState } from "react";
import FormVolumes from "@/components/FormVolumes";
import AddBook from "@/components/AddBook";
import { createBook, searchBookByTitle } from "../services/book.service";


interface IBookProps {
    onUpdate: () => void;
}


export default function Admin ({onUpdate}: IBookProps) {
    const [searchTitle, setSearchTitle] = useState("");
    const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
    const [bookData, setBookData] = useState<IBook | null>(null);
    const [activeSubsection, setActiveSubsection] = useState("Ajouter");
    const [activeSection, setActiveSection] = useState("Livres");
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearchTitle(searchTitle);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchTitle]);



    useEffect(() => {
        if (!debouncedSearchTitle || debouncedSearchTitle.trim().length < 3) {
            setBookData(null);
            return;
        }

        const fetchBook = async () => {
            setIsSearching(true);
            setHasSearched(true);


            try {
                const result = await searchBookByTitle(debouncedSearchTitle);
                setBookData(result);
            } catch {
                setBookData(null);
            } finally {
                setIsSearching(false);
            }
            
        };

        fetchBook();
    }, [debouncedSearchTitle]);

    const handleCreateBook = async (data: {
        title: string;
        genre: string;
        format: string;
        author: string;
    }) => {
        try {
            await createBook({
                ...data,
                user_id: 1,
            });

            setSearchTitle("");
            setBookData(null);
        } catch (error) {
            throw error;
        }
    }

    

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
                                onSave={handleCreateBook}
                                isSearching={isSearching}
                                hasSearched={hasSearched}

                        />)}
                        
                        {(activeSubsection === 'Volumes') && (
                            <FormVolumes
                                searchTitle={searchTitle}
                                onSearchChange={setSearchTitle}
                                bookData={bookData}
                                onSave={handleCreateBook}
                                isSearching={isSearching}
                                hasSearched={hasSearched}
                        />)}

                    </div>

                    
                    
                </div>
            </div>
            
            
        </>
    )
}
