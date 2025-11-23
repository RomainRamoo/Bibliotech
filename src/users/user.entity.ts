import { Serie } from "src/series/serie.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    last_name: string

    @Column()
    first_name: string;

    @Column()
    password: string;
    
    @OneToMany(() => Serie, (serie) => serie.user)
    series: Serie[];
}