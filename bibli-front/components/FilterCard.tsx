'use client';

import CheckboxList from "./CheckboxCard";

interface FilterState {
    classement: string[];
    genres: string[];
}

interface FiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    onClose: () => void;
}

const genres = [
    "Shonen",
    "Seinen",
    "Fantastique",
    "Autre",
];

const classement = [
    "Manga",
    "Comics",
    "BDs",
    "Lus",
];


export default function Filters({ filters, setFilters, onClose }: FiltersProps) {

    const toggle = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(v => v !== value)
                : [...prev[key], value]
        }));
    };

    return (
        <div className="m-2 border rounded">
            <h3 className="text-center">Filtres</h3>
            <div className="m-4">
                <CheckboxList 
                    items={classement}
                    selected={filters.classement}
                    onToggle={(v) => toggle("classement", v)}/>
            </div>

            <h3 className="text-center">Genres :</h3>
            <div className="m-4">
                <CheckboxList 
                    items={genres}
                    selected={filters.genres}
                    onToggle={(v) => toggle("genres", v)}/>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="btn btn-sm mt-2"
            >
                Fermer
            </button>
        </div>
    );
}
