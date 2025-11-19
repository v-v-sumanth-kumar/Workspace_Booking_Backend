import { Router } from "express";
import { AppDataSource } from "../app";
import { Room } from "../entity/Room";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const roomRepo = AppDataSource.getRepository(Room);
    const rooms = await roomRepo.find();
    res.json(rooms);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
