import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking";
import { Role } from "./roles";
import { LargeNumberLike } from "node:crypto";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    idUsers!: number;

    @Column({ type: "varchar", length: 50, name: "firstname" })
    firstname!: string;

    @Column({ type: "varchar", length: 255, name: "password" })
    password!: string;

    @Column({ type: "varchar", length: 80, name: "email" })
    email!: string;

    @Column({ type: "varchar", length: 50, name: "id_roles" })
    id_roles!: string;

    @ManyToOne(
        () => Role,
        (role) => role.users,
        { nullable: false },
    )
    @JoinColumn({ name: "id_roles" })
    role!: Role;
    // Role!= !Mandatory Input// 
    @OneToMany(
        () => Booking,
        (booking) => booking.user,
    )
    bookings: Booking[];
}
