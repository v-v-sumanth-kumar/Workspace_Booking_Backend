import { Router } from "express";
import { AppDataSource } from "../app";
import { Room } from "../entity/Room";
import { Booking } from "../entity/Booking";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const roomRepo = AppDataSource.getRepository(Room);
    const bookingRepo = AppDataSource.getRepository(Booking);
    const rooms = await roomRepo.find();

    const analytics = await Promise.all(rooms.map(async (room) => {
      const bookings = await bookingRepo.find({
        where: { roomId: room.id, status: "CONFIRMED" }
      });

      const totalHours = bookings.reduce((total, b) => {
        return total + ((new Date(b.endTime).getTime() - new Date(b.startTime).getTime()) / 36e5);
      }, 0);

      const totalRevenue = bookings.reduce((total, b) => total + b.totalPrice, 0);

      return {
        room: room.name,
        totalHours,
        totalRevenue
      };
    }));

    res.json(analytics);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
