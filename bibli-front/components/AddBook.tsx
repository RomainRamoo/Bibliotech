'use client'
import IBook from "@/@types/Series";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageValide from "../public/coche.png";
import IVolume from "@/@types/Volume";
import SuccessMessage from "./SuccessMessage";

interface AddBookProps {
    searchTitle: string;
    onSearchChange: (value: string) => void;
    bookData: IBook | null;
    volumeData: IVolume | null;
    isSearching: boolean;
    hasSearched: boolean;
    onSave: (data: {
        title: string;
        genre: string;
        format: string;
        author: string;
        price?: number;
        book_cover?: string;
        lastVolumeNumber: number;
    }) => Promise<void>;
}

type Message = {
    text: string;
    type: 'succes'| 'error';
} | null;

export default function AddBook ({
    searchTitle,
    onSearchChange,
    bookData,
    volumeData,
    onSave,
    isSearching,
    hasSearched,
}: AddBookProps) {
    
    const [message, setMessage] = useState<Message>(null);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [format, setFormat] = useState("");
    const [author, setAuthor] = useState("");
    const [lastVolumeNumber, setLastVolumeNumber] = useState<number>(1);
    const [price, setPrice] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState<string | null>(null);

    
    

    const handleSave = async () => {

        if (!title || !author || !format || !genre) {
            setMessage({text: "❌ Champs obligatoires manquants.", type: 'error'})
            return;
        }

        setIsLoading(true);

        
        try {
                await  onSave({
                    title,
                    genre,
                    format,
                    author,
                    book_cover: 
                        url && url.trim() !== ""
                        ? url.trim()
                        : undefined,
                    price: price ?? undefined,
                    lastVolumeNumber,
            });

            //reset form
            setTitle('');
            setGenre('');
            setFormat('');
            setAuthor('');
            setPrice(null);
            setUrl('');
            setLastVolumeNumber(1);

            setMessage({ text: 'Livre ajouté !', type: 'succes' });
            setTimeout(() => setMessage({text: "", type: 'succes'}), 3000);

        } catch (error) {
            setMessage({ text:"❌ Une erreur est survenue lors de l'enregistrement.", type: 'error'});
            console.log(error)
        } finally {
            { setIsLoading(false) }
        }
    }


    useEffect(() => {
        if (!bookData) return;

        setTitle(bookData.title);
        setGenre(bookData.genre);
        setFormat(bookData.format);
        setAuthor(bookData.author);
        setUrl(bookData.book_cover ?? null);
        setPrice(volumeData?.price ?? null);
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
                                <p className="text-sm text-gray-400 italic ml-2">
                                    Recherche en cours...
                                </p>
                            )}

                            {!isSearching && hasSearched && !bookData && (
                                <p className="text-sm text-gray-400 ml-2">
                                    Aucun résultat
                                </p>
                            )}
                            
                            {bookData && (
                                <p className="text-sm text-green-600 ml-2">
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

                            <input 
                                type="text" 
                                placeholder="Dernier volume sorti" 
                                className="input self-center m-4"
                                value={lastVolumeNumber}
                                min={1}
                                onChange={(event) => setLastVolumeNumber(Number(event.target.value))}
                            />

                            <input 
                                type="number" 
                                placeholder="Prix" 
                                className="input self-center m-4"
                                value={price ?? ''}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setPrice(value === '' ? null : Number(value))
                                }} 
                            />
                            
                            <select 
                                defaultValue="Format" 
                                className="select self-center m-4"
                                value={format}
                                onChange={(event) => {setFormat(event.target.value)}}
                            >
                                <option disabled={false}>Format</option>
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
                                <option disabled={false}>Genre</option>
                                <option>S.F</option>
                                <option>Thriller</option>
                                <option>Fantastique</option>
                                <option>Héroïque</option>
                                <option>Fantasy</option>
                                <option>Horreur</option>
                                <option>Dark Fantasy</option>
                                <option>Shonen</option>
                                <option>Seinen</option>
                                <option>Autre</option>
                            </select>
                            <label className="input">
                                <span className="label">/</span>
                                <input 
                                    type="url" 
                                    placeholder="Lien de la couverture" 
                                    className="input self-center m-4"
                                    value={url ?? ""}
                                    onChange={(event) => setUrl(event.target.value || null)}
                                />
                                <span className="label">.webp</span>

                            </label>


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
                                    disabled={isLoading}
                                    type="button"
                                    onClick={handleSave}>
                                        {isLoading ? 'Création...' : <Image
                                        src={ImageValide}
                                        alt="Valider"
                                        width={50}
                                    /> }
                                    
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    {message && (
                        <SuccessMessage
                            successMessage={message.text}
                            isSuccessMessage={message.type === 'succes'}
                        />
                    )}
                
        </>
    )
}