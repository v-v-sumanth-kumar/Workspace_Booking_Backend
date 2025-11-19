// src/controllers/bookingsController.ts
import { Request, Response } from 'express';
import { Booking } from '../entity/Booking';
import { AppDataSource } from "../app";

export const getAllBookings = async (req: Request, res: Response) => {
    const bookingRepository = AppDataSource.getRepository(Booking);

  try {
    const bookings = await bookingRepository.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
