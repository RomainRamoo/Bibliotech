import IBook from "@/@types/Series";
import { useEffect, useState } from "react";
import Image from "next/image";
import SuccessMessage from "./SuccessMessage";
import ImageValide from "../public/coche.png";

interface AddBookProps {
    searchTitle: string;
    onSearchChange: (value: string) => void;
    bookData: IBook | null;
    isSearching: boolean;
    hasSearched: boolean;
    onSave: (data: {
        title: string;
        genre: string;
        format: string;
        author: string;
    }) => Promise<void>;
}

export default function AddBook ({
    searchTitle,
    onSearchChange,
    bookData,
    onSave,
    isSearching,
    hasSearched,
}: AddBookProps) {
    
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(true);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [format, setFormat] = useState("");
    const [author, setAuthor] = useState("");

    const handleSave = async () => {
        if (!title || !author || !format || !genre) {
            setSuccessMessage("❌ Champs obligatoires manquants.")
        }
        try {
            await onSave({ title, genre, format, author });

            setAuthor("");
            setFormat("");
            setGenre("");
            setTitle("");
            
            setSuccessMessage('✅ Livre ajouté !');
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            setSuccessMessage("❌ Une erreur est survenue lors de l'enregistrement.");
        }
    }


    useEffect(() => {
        if (!bookData) return;

        setTitle(bookData.title);
        setGenre(bookData.genre);
        setFormat(bookData.format);
        setAuthor(bookData.author);
    }, [bookData]);
    
    return (
        <>
            
                    <fieldset className="fieldset glass rounded-box m-6">
                        <div className="flex flex-col m-6">
                            <input 
                                type="text" 
                                placeholder="Chercher" 
                                className="input self-center m-4"
                                value={searchTitle}
                                onChange={(event) => onSearchChange(event.target.value)}
                            />

                            {isSearching && (
                                <p className="text-sm text-gray-400 italic">
                                    Recherche en cours...
                                </p>
                            )}

                            {!isSearching && hasSearched && !bookData && (
                                <p className="text-sm text-gray-400">
                                    Aucun résultat
                                </p>
                            )}
                            
                            {bookData && (
                                <p className="text-sm text-green-600">
                                    {bookData.title}
                                </p>
                            )}

                            <input 
                                type="text" 
                                placeholder="Titre" 
                                className="input self-center m-4"
                                value={title}
                                onChange={(event) => {setTitle(event.target.value)}}
                            />
                            <select 
                                defaultValue="Format" 
                                className="select self-center m-4"
                                value={format}
                                onChange={(event) => {setFormat(event.target.value)}}
                            >
                                <option disabled={true}>Format</option>
                                <option>Manga</option>
                                <option>Comic</option>
                                <option>BD</option>
                                <option>Autres</option>
                            </select>
                            <select 
                                defaultValue="Genre" 
                                className="select self-center m-4"
                                value={genre}
                                onChange={(event) => {setGenre(event.target.value)}}
                            >
                                <option disabled={true}>Genre</option>
                                <option>S.F</option>
                                <option>Fantastique</option>
                                <option>Héroïque</option>
                                <option>Fantasy</option>
                                <option>Horreur</option>
                                <option>Dark Fantasy</option>
                            </select>
                            <input
                                type="text" 
                                placeholder="Auteur" 
                                className="input self-center m-4"
                                value={author}
                                onChange={(event) => {setAuthor(event.target.value)}}
                            />
                            
                            <div className="flex justify-around">
                                <h3 className="self-center m-4 text-xl">Ajouter à la réserve</h3>
                                <button 
                                    type="button"
                                    onClick={handleSave}>
                                    <Image
                                        src={ImageValide}
                                        alt="Valider"
                                        width={50}
                                    />
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <div className="self-center">
                        {successMessage && <SuccessMessage 
                        successMessage = {successMessage} 
                        isSuccessMessage = {isSuccessMessage}/>}
                    </div>
                
        </>
    )
}