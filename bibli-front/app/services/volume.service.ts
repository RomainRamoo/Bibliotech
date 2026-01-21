import IVolume from "@/@types/Volume";
import { API_URL } from "@/lib/config";
import axios from "axios"


interface CreateVolumePayload {
    volume_number: number;
    price?: number;
    image_url?: string;
    signed: boolean;
    collector: boolean;
    is_read: boolean;
    is_possess: boolean;
    publication_date?: string;
}

export async function createVolume(
    payload: CreateVolumePayload,
    seriesId: number): Promise<IVolume> {

        const response = await axios.post(
            `${API_URL}/series/${seriesId}/volumes`,
            payload,
            {withCredentials: true}
        );

    return response.data

}