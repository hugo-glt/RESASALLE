import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity("Bookings")
export class Booking {
    @PrimaryColumn({ type: "varchar", length: 50, name: "id_bookings" })
    idBookings: string;

    @Column({ type: "varchar", length: 50, name: "id_users" })
    idUsers: string;

    @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
    @JoinColumn({ name: "id_users" })
    user: User;
}
