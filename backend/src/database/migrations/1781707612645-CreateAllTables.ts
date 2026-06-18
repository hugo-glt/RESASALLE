import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1781707612645 implements MigrationInterface {
    name = 'CreateAllTables1781707612645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id_roles\` varchar(50) NOT NULL, \`roles_names\` enum ('Student', 'Teacher', 'Admin') NOT NULL, PRIMARY KEY (\`id_roles\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`idUsers\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(80) NOT NULL, \`id_roles\` varchar(50) NOT NULL, PRIMARY KEY (\`idUsers\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Disponibilities\` (\`idDisponibilities\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL, \`reasons\` varchar(500) NOT NULL, \`id_rooms\` int NOT NULL, UNIQUE INDEX \`REL_d85fde6075ffabdc8ceb26e533\` (\`id_rooms\`), PRIMARY KEY (\`idDisponibilities\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Equipements\` (\`idEquipements\` int NOT NULL AUTO_INCREMENT, \`serial\` int NOT NULL, \`disponibilities\` tinyint NOT NULL, \`description\` varchar(500) NOT NULL, PRIMARY KEY (\`idEquipements\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Rooms\` (\`id_rooms\` int NOT NULL AUTO_INCREMENT, \`numbers\` int NOT NULL, \`floors\` int NOT NULL, \`buildings\` varchar(50) NOT NULL, \`modularities\` tinyint NOT NULL, \`capacities\` int NOT NULL, PRIMARY KEY (\`id_rooms\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Booking\` (\`idBooking\` int NOT NULL AUTO_INCREMENT, \`dates\` date NULL, \`time_slot_start\` time NOT NULL, \`time_slot_end\` time NOT NULL, \`subject\` varchar(100) NOT NULL, \`id_users\` int NULL, \`id_rooms\` int NOT NULL, PRIMARY KEY (\`idBooking\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`equipment_room\` (\`id_rooms\` int NOT NULL AUTO_INCREMENT, \`id_equipements\` int NOT NULL, PRIMARY KEY (\`id_rooms\`, \`id_equipements\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`History\` (\`idHistory\` int NOT NULL AUTO_INCREMENT, \`actions\` enum ('CREATE', 'MODIFICATION', 'SUPRESSION', 'CANCEL') NOT NULL, \`status\` enum ('CREATE', 'MODIFICATION', 'SUPRESSION', 'CANCEL') NOT NULL, \`id_booking\` int NOT NULL, PRIMARY KEY (\`idHistory\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` CHANGE \`id_rooms\` \`id_rooms\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD PRIMARY KEY (\`id_equipements\`)`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP COLUMN \`id_rooms\``);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD \`id_rooms\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD PRIMARY KEY (\`id_equipements\`, \`id_rooms\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_022c376d54da3abb725f500e2c\` ON \`equipment_room\` (\`id_rooms\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_dc65375664e1d2397ead263a42\` ON \`equipment_room\` (\`id_equipements\`)`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_d212708ee43ac19a6046f495367\` FOREIGN KEY (\`id_roles\`) REFERENCES \`roles\`(\`id_roles\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Disponibilities\` ADD CONSTRAINT \`FK_d85fde6075ffabdc8ceb26e5336\` FOREIGN KEY (\`id_rooms\`) REFERENCES \`Rooms\`(\`id_rooms\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Booking\` ADD CONSTRAINT \`FK_415b2f0171b8cea2f030ca00da3\` FOREIGN KEY (\`id_users\`) REFERENCES \`Users\`(\`idUsers\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Booking\` ADD CONSTRAINT \`FK_ffcda06be5b3ea7a6972cbcfc76\` FOREIGN KEY (\`id_rooms\`) REFERENCES \`Rooms\`(\`id_rooms\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD CONSTRAINT \`FK_022c376d54da3abb725f500e2c3\` FOREIGN KEY (\`id_rooms\`) REFERENCES \`Rooms\`(\`id_rooms\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD CONSTRAINT \`FK_dc65375664e1d2397ead263a42f\` FOREIGN KEY (\`id_equipements\`) REFERENCES \`Equipements\`(\`idEquipements\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`History\` ADD CONSTRAINT \`FK_257f4620528ef13c722f13e17f4\` FOREIGN KEY (\`id_booking\`) REFERENCES \`Booking\`(\`idBooking\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`History\` DROP FOREIGN KEY \`FK_257f4620528ef13c722f13e17f4\``);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP FOREIGN KEY \`FK_dc65375664e1d2397ead263a42f\``);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP FOREIGN KEY \`FK_022c376d54da3abb725f500e2c3\``);
        await queryRunner.query(`ALTER TABLE \`Booking\` DROP FOREIGN KEY \`FK_ffcda06be5b3ea7a6972cbcfc76\``);
        await queryRunner.query(`ALTER TABLE \`Booking\` DROP FOREIGN KEY \`FK_415b2f0171b8cea2f030ca00da3\``);
        await queryRunner.query(`ALTER TABLE \`Disponibilities\` DROP FOREIGN KEY \`FK_d85fde6075ffabdc8ceb26e5336\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_d212708ee43ac19a6046f495367\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc65375664e1d2397ead263a42\` ON \`equipment_room\``);
        await queryRunner.query(`DROP INDEX \`IDX_022c376d54da3abb725f500e2c\` ON \`equipment_room\``);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD PRIMARY KEY (\`id_equipements\`)`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP COLUMN \`id_rooms\``);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD \`id_rooms\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` ADD PRIMARY KEY (\`id_rooms\`, \`id_equipements\`)`);
        await queryRunner.query(`ALTER TABLE \`equipment_room\` CHANGE \`id_rooms\` \`id_rooms\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP TABLE \`History\``);
        await queryRunner.query(`DROP TABLE \`equipment_room\``);
        await queryRunner.query(`DROP TABLE \`Booking\``);
        await queryRunner.query(`DROP TABLE \`Rooms\``);
        await queryRunner.query(`DROP TABLE \`Equipements\``);
        await queryRunner.query(`DROP INDEX \`REL_d85fde6075ffabdc8ceb26e533\` ON \`Disponibilities\``);
        await queryRunner.query(`DROP TABLE \`Disponibilities\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
