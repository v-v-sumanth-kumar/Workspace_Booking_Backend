import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("int")
  baseHourlyRate!: number;

  @Column("int")
  capacity!: number;
}
