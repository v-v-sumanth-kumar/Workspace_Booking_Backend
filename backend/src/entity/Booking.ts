import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "./Room";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userName: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @Column()
  roomId: string;

  @Column("timestamptz")
  startTime: Date;

  @Column("timestamptz")
  endTime: Date;

  @Column("float")
  totalPrice: number;

  @Column({ default: "CONFIRMED" })
  status: "CONFIRMED" | "CANCELLED";
}
