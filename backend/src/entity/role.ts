import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";

@Entity("Roles")
export class Role {
    @PrimaryColumn({ type: "varchar", length: 50, name: "id_roles" })
    idRoles: string;

    @Column({ type: "varchar", length: 50, name: "roles_name" })
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
