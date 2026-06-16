import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Role } from './role';
import { Booking } from './booking';

@Entity('Users')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 50, name: 'id_users' })
    idUsers: string;

    @Column({ type: 'varchar', length: 50, name: 'users_firstname' })
    firstname: string;

    @Column({ type: 'varchar', length: 50, name: 'users_familyname' })
    familyname: string;

    @Column({ type: 'varchar', length: 255, name: 'users_password' })
    password: string;

    @Column({ type: 'varchar', length: 80, name: 'users_email' })
    email: string;

    @Column({ type: 'varchar', length: 50, name: 'id_roles' })
    idRoles: string;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false })
    @JoinColumn({ name: 'id_roles' })
    role: Role;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];
}