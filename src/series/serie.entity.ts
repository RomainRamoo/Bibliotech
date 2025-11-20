import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('series')
export class Serie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column()
    author: string;

    @Column()
    format: string;

    @Column()
    user_id: number;

}