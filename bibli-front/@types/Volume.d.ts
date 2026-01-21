

export default interface IVolume {
    id: number;
    volume_number: number;
    price?: number;
    image_url?: string;
    signed: boolean;
    collector: boolean;
    is_read: boolean;
    is_possess: boolean;
    publication_date?: string;
    series_id: number;
}