import { Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "./rooms";
import { Equipement } from "./equipements";

@Entity("equipment_room")
export class EquipmentRoom {
    @PrimaryGeneratedColumn()
    id_rooms!: number;

    @PrimaryColumn({name: "id_equipements" })
    idEquipements!: number;

    @ManyToOne(() => Room)
    @JoinColumn({ name: "id_rooms" })
    room: Room;

    @ManyToOne(() => Equipement)
    @JoinColumn({ name: "id_equipements" })
    equipement: Equipement;
}