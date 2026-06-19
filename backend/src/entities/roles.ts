import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { User } from "./users";

@Entity("roles")
export class Role {
    @PrimaryColumn({ type: "varchar", length: 50, name: "id_roles" })
    id_roles!: string;

    @Column({
        type: "enum",
        enum: ["Student", "Teacher", "Admin"],
        name: "roles_names",
    })
    names!: "Student" | "Teacher" | "Admin";

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}