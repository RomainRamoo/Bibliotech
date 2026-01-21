import { useEffect, useState } from "react";
import Image from "next/image";
import ImageValide from "../public/coche.png";
import SuccessMessage from "./SuccessMessage";
import { DayPicker } from "react-day-picker";
import { createVolume } from "@/app/services/volume.service";

interface FormVolumesProps {
    searchTitle: string;
    onSearchChange: (value: string) => void;
    searchSerie: searchSerieWithLastVolume | null;
    isSearching: boolean;
    hasSearched: boolean;
    onSave: (data: {
        serieId: number;
        price?: number;
        publication_date?: string;
        image_url?: string;
        volumeNumber: number;
    }) => Promise<void>;
}

export interface searchSerieWithLastVolume {
    id: number;
    title: string;
    genre: string;
    author: string;
    format: string;
    lastVolumeNumber: number | null;
}

type Message = {
    text: string;
    type: 'succes'| 'error';
} | null;

export default function FormVolumes ({
    searchTitle,
    onSearchChange,
    searchSerie,
    isSearching,
    hasSearched,
    onSave,
}: FormVolumesProps) {
    
    const [volumeNumber, setVolumeNumber] = useState<number>(1);
    const [price, setPrice] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<Message>(null);
    const [publication_date, setPublication_Date] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!searchSerie) return;

        setVolumeNumber(
            searchSerie.lastVolumeNumber
            ? searchSerie.lastVolumeNumber + 1
            : 1
        );
    }, [searchSerie]);

    const handleSubmit = async () => {
        if (!searchSerie) return;

        setIsLoading(true);
        setMessage(null);

        try {
            const payload = {
            volume_number: volumeNumber,
            signed: false,
            collector: false,
            is_read: false,
            is_possess: false,
            price: price ?? undefined,
            image_url:
                url && url.trim() !== ""
                ? url.trim()
                : undefined,
            publication_date:
                publication_date && publication_date !== ""
                ? publication_date
                : undefined,
            };

            await createVolume(payload, searchSerie.id);

            setMessage({ text: "Volume ajouté", type: "succes" });
        } catch {
            setMessage({ text: "Erreur lors de l'ajout", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            
                    <fieldset className="fieldset glass rounded-box m-6">
                        <div className="flex flex-col m-6">
                            <input 
                                type="text" 
                                placeholder="Chercher un Titre" 
                                className="input self-center m-4"
                                value={searchTitle}
                                onChange={(event) => onSearchChange(event.target.value)}
                            />

                            {isSearching && (
                                <p className="text-sm text-gray-400 italic ml-18">
                                    Recherche en cours...
                                </p>
                            )}

                            {!isSearching && hasSearched && !searchSerie && (
                                <p className="text-sm text-gray-400 ml-18">
                                    Aucun résultat
                                </p>
                            )}
                            
                            {searchSerie && (
                                <p className="text-green-600 ml-18">
                                    {searchSerie.title} — dernier volume{" "}
                                    {searchSerie.lastVolumeNumber ?? "aucun"}
                                </p>
                            )}

                            <input 
                                type="number" 
                                placeholder="Dernier volume sorti" 
                                className="input self-center m-4"
                                value={volumeNumber}
                                min={1}
                                onChange={(event) => setVolumeNumber(Number(event.target.value))}
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

                            <input 
                                type="url" 
                                placeholder="Lien de l'image" 
                                className="input self-center m-4"
                                value={url ?? ""}
                                onChange={(event) => setUrl(event.target.value || null)}
                            />

                            <button popoverTarget="rdp-popover" className="input input-border self-center m-4" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                                {publication_date ?? "Date de parution"}
                            </button>
                            <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                                <DayPicker 
                                    className="react-day-picker"
                                    timeZone="UTC" 
                                    mode="single" 
                                    selected={publication_date ? new Date(publication_date) : undefined} 
                                    onSelect={(date) => 
                                        setPublication_Date(date ? date.toISOString().split('T')[0] : null)
                                    } />
                            </div>
                            <div className="flex justify-around">
                                <h3 className="self-center m-4 text-xl">Ajouter à la réserve</h3>
                                <button 
                                    disabled={isLoading}
                                    type="button"
                                    onClick={handleSubmit}>
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