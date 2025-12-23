'use client'
import ImageValide from "../../public/coche.png"
import Image from "next/image";
import IBook from "@/@types/Series";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import SuccessMessage from "@/components/SuccessMessage";


interface IBookProps {
    onUpdate: () => void;
}


export default function Admin ({onUpdate}: IBookProps) {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [format, setFormat] = useState("");
    const [author, setAuthor] = useState("")
    const [errorBook, setErrorBook] = useState('');
    const [searchTitle, setSearchTitle] = useState("");
    const [bookData, setBookData] = useState<IBook | null>(null);
    const [url, setUrl] = useState("https://")
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(true);

    const user_id = 1;


    

    const handleSearchBook = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value)
    }
    useEffect(() => {
        if (!bookData) return;

        setTitle(bookData.title);
        setGenre(bookData.genre);
        setFormat(bookData.format);
        setAuthor(bookData.author);
    }, [bookData]);

    
    useEffect(() => {
        if (!searchTitle || searchTitle.trim().length < 3) {
            setBookData(null);
            return;
        }

        const fetchBook = async () => {
            const response = await axios.get(
                `${API_URL}/series`,
                { params: { title: searchTitle } }
            );

            setBookData(response.data);
        };

        fetchBook();
    }, [searchTitle]);

    const handleSave = async () => {
        try {
            await axios.post(`${API_URL}/series`,
                {
                    title,
                    genre,
                    format,
                    author,
                    user_id,
                }, {
                    withCredentials: true,
                }
            );
            setAuthor("");
            setFormat("");
            setGenre("");
            setTitle("");
            setSuccessMessage('✅ Données mise à jour !');
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            setSuccessMessage('❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    return (
        <>
            <div className="min-h-screen">
                <div><h1 className="text-center text-3xl m-5">La réserve</h1></div>
                <div className="flex justify-around mt-5">
                    <button className="w-30 h-8 text-xl outline-2 outline-gray-100 hover:outline-orange-300"><h2>Livres</h2></button>
                    <button className="w-30 h-8 text-xl outline-2 outline-gray-100 hover:outline-orange-300"><h2>Séries</h2></button>
                    <button className="w-30 h-8 text-xl outline-2 outline-gray-100 hover:outline-orange-300"><h2>Films</h2></button>
                </div>
                <div className="flex flex-col justify-center mt-2 mr-2 ml-2">
                    <fieldset className="w-full h-full fieldset glass rounded-box m-6">
                        <div className="flex flex-col m-6">
                            <input 
                                type="text" 
                                placeholder="Chercher" 
                                className="input self-center m-4"
                                value={searchTitle}
                                onChange={handleSearchBook}
                            />
                            
                            {bookData ? (
                                <p>{bookData.title}</p>
                            ) : ( 
                                <p>Aucun résultat</p>
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
                                <button type="button" onClick={handleSave}>
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
                </div>
            </div>
            
            
        </>
    )
}

/*
<input 
    type="url" 
    className="input validator self-center m-4" 
    required placeholder="https://" 
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$" 
    title="Must be valid URL" 
/>
<p className="validator-hint">Must be valid URL</p>

<input 
    type="date" 
    className="input validator self-center m-4" 
    required placeholder="Pick a date in 2025" 
    min="2025-01-01" 
    max="2025-12-31"
    title="Must be valid URL"
    
/>

<p className="validator-hint">Must be 2025</p>
*/