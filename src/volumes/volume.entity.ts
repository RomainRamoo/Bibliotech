import { Serie } from "src/series/serie.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('volumes')
@Unique(['series', 'volume_number'])
export class Volume {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    volume_number: number;

    @Column({ type: 'numeric', nullable: true })
    price: number;

    @Column({ nullable: true })
    image_url: string;

    @Column()
    signed: boolean;

    @Column()
    collector: boolean;

    @Column()
    is_read: boolean;

    @Column()
    is_possess: boolean;

    @Column()
    publication_date: Date;

    @ManyToOne(() => Serie, serie => serie.volumes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'series_id' })
    series: Serie;
}
