import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Booking } from "./booking";

@Entity("History")
export class History {
    @PrimaryGeneratedColumn()
    idHistory!: number;

    @Column({
        type: "enum",
        enum: ["CREATE", "MODIFICATION", "SUPRESSION", "CANCEL", "LOGIN","LOGOUT"],
        name: "actions",
    })
    actions!: "CREATE" | "MODIFICATION" | "SUPRESSION" | "CANCEL" | "LOGIN" | "LOGOUT";

    @Column({
        type: "enum",
        enum: ["CREATE", "MODIFICATION", "SUPRESSION", "CANCEL","LOGIN","LOGOUT"],
        name: "status",
    })
    status!: "CREATE" | "MODIFICATION" | "SUPRESSION" | "CANCEL" | "LOGIN" | "LOGOUT";

    @Column({name: "id_booking" })
    idBooking!: number;

    @ManyToOne(() => Booking, { nullable: false })
    @JoinColumn({ name: "id_booking" })
    booking: Booking;
}