import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./users";
import { Room } from "./rooms";

@Entity("Booking")
export class Booking {
    @PrimaryGeneratedColumn()
    idBooking!: number;

    @Column({ type: "date", nullable: true, name: "dates" })
    dates!: Date | null;

    @Column({ type: "time", name: "time_slot_start" })
    timeslotstart!: string;

    @Column({ type: "time", name: "time_slot_end" })
    timeslotend!: string;

    @Column({ type: "varchar", length: 100, name: "subject" })
    subject!: string;

    @Column({ name: "id_users", nullable: true })
    idUsers!: number | null;

    @Column({name: "id_rooms" })
    id_rooms!: number;

    @ManyToOne(() => User, (user) => user.bookings, { nullable: true })
    @JoinColumn({ name: "id_users" })
    user: User | null;

    @ManyToOne(() => Room, (room) => room.bookings)
    @JoinColumn({ name: "id_rooms" })
    room: Room;
}