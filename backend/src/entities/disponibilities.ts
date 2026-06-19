import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Room } from "./rooms";

@Entity("Disponibilities")
export class Disponibility {
    @PrimaryGeneratedColumn()
    idDisponibilities!: number;

    @Column({ type: "boolean", name: "status" })
    status!: boolean;

    @Column({ type: "varchar", length: 500, name: "reasons" })
    reasons!: string;

    @Column({name: "id_rooms" })
    id_rooms!: number;

    @OneToOne(() => Room, (room) => room.disponibility)
    @JoinColumn({ name: "id_rooms" })
    room: Room;
}