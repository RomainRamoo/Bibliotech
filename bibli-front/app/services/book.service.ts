import IBook from "@/@types/Series";
import { API_URL } from "@/lib/config";
import axios from "axios"

interface CreateBookPayload {
    title: string;
    genre: string;
    format: string;
    author: string;
    user_id: number;
}

export async function createBook(payload: CreateBookPayload): Promise<IBook> {
    const response = await axios.post(
        `${API_URL}/series`,
        payload,
        {withCredentials: true}
    );

    return response.data;
}

export async function searchBookByTitle(title: string): Promise<IBook | null> {

    const response = await axios.get(
                `${API_URL}/series`,
                { params: { title } }
    );
    
    return response.data ?? null;
}