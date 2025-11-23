import { Serie } from "src/series/serie.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('volumes')
export class Volume {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    volume_number: number;

    @Column({ type: 'numeric', nullable: true })
    price: number;

    @Column({ nullable: true })
    image_url: string

    @Column()
    signed: boolean;

    @Column()
    collector: boolean;

    @Column()
    is_read: boolean;

    @Column()
    publication_date: Date;

    @ManyToOne(() => Serie, series => series.volumes, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'serie_id'})
    series: Serie
}