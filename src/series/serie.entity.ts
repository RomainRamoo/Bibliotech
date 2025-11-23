import { User } from "src/users/user.entity";
import { Volume } from "src/volumes/volume.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('series')
export class Serie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    genre: string;

    @Column({ nullable: true })
    author: string;

    @Column({ nullable: true })
    format: string;

    @ManyToOne(() => User, user => user.series, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Volume, volume => volume.series)
    volumes: Volume[];

}