import { CreateSerieResponse } from "@/@types/create-series-response";
import IBook from "@/@types/Series";
import { searchSerieWithLastVolume } from "@/components/FormVolumes";
import { API_URL } from "@/lib/config";
import axios from "axios"

interface CreateBookPayload {
    title: string;
    genre: string;
    format: string;
    author: string;
    price?: number;
    book_cover?: string;
    lastVolumeNumber: number;
}



export async function createBook(
    payload: CreateBookPayload
): Promise<CreateSerieResponse> {
    const response = await axios.post(
        `${API_URL}/series`,
        payload,
        {withCredentials: true}
    );

    return response.data;
}

export async function searchSerie(title: string): Promise<IBook | null> {

    const response = await axios.get(
                `${API_URL}/series/`,
                { params: { title } }
    );
    
    return response.data ?? null;
}

export async function searchSerieWithLastVolumeByTitle(
    title: string
): Promise<searchSerieWithLastVolume | null> {
    const response = await axios.get(`${API_URL}/series/`, {
        params: {
            title,
            withLastVolume: true,
        },
    });
    return response.data ?? null;
}

export async function getAllSeries(): Promise<IBook[]> {
    const response = await axios.get(
        `${API_URL}/series/all`
    );

    return response.data;
}
