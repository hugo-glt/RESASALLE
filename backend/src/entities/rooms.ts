import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Disponibility } from "./disponibilities";
import { Booking } from "./booking";
import { Equipement } from "./equipements";

@Entity("Rooms")
export class Room {
    @PrimaryGeneratedColumn()
    id_rooms!: number;

    @Column({ type: "int", name: "numbers" })
    numbers!: number;

    @Column({ type: "int", name: "floors" })
    floors!: number;

    @Column({ type: "varchar", length: 50, name: "buildings" })
    buildings!: string;

    @Column({ type: "boolean", name: "modularities" })
    modularities!: boolean;

    @Column({ type: "int", name: "capacities" })
    capacities!: number;

    @OneToOne(() => Disponibility, (d) => d.room)
    disponibility!: Disponibility;

    @OneToMany(() => Booking, (booking) => booking.room)
    bookings!: Booking[];

    @ManyToMany(() => Equipement)
    @JoinTable({
        name: "equipment_room",
        joinColumn: { name: "id_rooms", referencedColumnName: "id_rooms" },
        inverseJoinColumn: { name: "id_equipements", referencedColumnName: "idEquipements" },
    })
    equipements: Equipement[];
}