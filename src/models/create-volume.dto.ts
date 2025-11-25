export class CreateVolumeDto {
    volume_number: number;
    price?: number;
    image_url?: string;
    signed: boolean;
    collector: boolean;
    is_read: boolean;
    publication_date: Date;
}