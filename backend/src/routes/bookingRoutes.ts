import { Router } from "express";
import { AppDataSource } from "../app";
import { Booking } from "../entity/Booking";
import { Room } from "../entity/Room";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { roomId, userName, startTime, endTime } = req.body;
    const bookingRepo = AppDataSource.getRepository(Booking);
    const roomRepo = AppDataSource.getRepository(Room);

    const room = await roomRepo.findOneBy({ id: roomId });
    if (!room) {
      return res.status(400).json({ message: "Invalid roomId" });
    }

    // TODO: Add booking conflict prevention, dynamic pricing

    const booking = bookingRepo.create({
      roomId,
      userName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalPrice: room.baseHourlyRate, // Modify with dynamic price logic
      status: "CONFIRMED",
    });

    await bookingRepo.save(booking);
    res.status(201).json(booking);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookingRepo = AppDataSource.getRepository(Booking);
    const booking = await bookingRepo.findOneBy({ id: req.params.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "CANCELLED";
    await bookingRepo.save(booking);
    res.json({ message: "Booking cancelled" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
