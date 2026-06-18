import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Equipements")
export class Equipement {
    @PrimaryGeneratedColumn()
    idEquipements!: number;

    @Column({ type: "int", name: "serial" })
    serial!: number;

    @Column({ type: "boolean", name: "disponibilities" })
    disponibilities!: boolean;

    @Column({ type: "varchar", length: 500, name: "description" })
    description!: string;
}